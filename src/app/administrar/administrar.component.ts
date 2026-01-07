/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * administrar.component.ts
 * Componente encargado del panel de administración de trabajadores.
 * Permite crear, consultar, actualizar y eliminar (mock) trabajadores, además de gestionar su estado.
 */

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { User } from '../models/user.model';

@Component({
  /**
   * Selector del componente.
   */
  selector: 'app-administrar',

  /**
   * Indica que el componente forma parte de un módulo (no standalone).
   */
  standalone: false,

  /**
   * Plantilla HTML asociada al componente.
   */
  templateUrl: './administrar.component.html',

  /**
   * Hoja de estilos específica del componente.
   */
  styleUrl: './administrar.component.css',

  /**
   * Proveedor del servicio API a nivel de componente.
   * Cada instancia del componente tiene su propio ApiService.
   */
  providers: [ApiService]
})
export class AdministrarComponent {

  /**
   * Datos utilizados en el formulario.
   * Se reutiliza tanto para crear (POST) como para editar (PUT).
   */
  public createData: Partial<User> = {
    first_name: '',
    last_name: '',
    email: ''
  };

  /**
   * Usuario cargado en modo detalle (/administrar/:id).
   * En modo panel (/administrar) permanece en null.
   */
  public user: User | null = null;

  /**
   * Estados disponibles para el seguimiento del trabajador.
   */
  public estados: string[] = ['En proceso', 'Contratado', 'Despedido'];

  /**
   * Estado actual asociado al trabajador (persistido en localStorage).
   */
  public estadoSeleccionado: string = 'En proceso';

  /**
   * Estado utilizado durante la edición (para poder cancelar sin perder el valor anterior).
   */
  public estadoEdit: string = 'En proceso';

  /**
   * Indicador de carga para mostrar mensajes/spinners en la vista.
   */
  public loading: boolean = true;

  /**
   * Mensaje de error mostrado en la vista.
   */
  public errorMessage: string = '';

  /**
   * ID actualmente seleccionado desde la ruta (si existe).
   */
  public selectedId: number | null = null;

  /**
   * Mensaje de éxito mostrado tras operaciones CRUD.
   */
  public successMessage: string = '';

  /**
   * Indica si el componente se encuentra en modo edición.
   */
  public editMode: boolean = false;

  /**
   * Inyección de ActivatedRoute para leer parámetros de la URL
   * y del servicio de API para realizar peticiones HTTP.
   */
  constructor(
    private _route: ActivatedRoute,
    private _apiService: ApiService
  ) {}

  /**
   * Método del ciclo de vida. Se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.loadUserFromRoute();
  }

  /**
   * Detecta cambios en la ruta:
   * - /administrar           => modo panel (sin id)
   * - /administrar/:id       => modo detalle (con id)
   */
  private loadUserFromRoute(): void {
    this._route.paramMap.subscribe(params => {
      const idParam = params.get('id');

      // Reset de estado cada vez que cambia la ruta
      this.errorMessage = '';
      this.user = null;

      // MODO PANEL: /administrar (sin id)
      if (!idParam) {
        this.selectedId = null;
        this.loading = false;
        return;
      }

      const id = Number(idParam);

      // Validación del parámetro id
      if (Number.isNaN(id)) {
        this.selectedId = null;
        this.errorMessage = 'ID inválido en la URL.';
        this.loading = false;
        return;
      }

      // MODO DETALLE: /administrar/:id
      this.selectedId = id;
      this.getById(id);
    });
  }

  /**
   * Obtiene un trabajador por ID desde la API y precarga datos para edición.
   */
  private getById(id: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this._apiService.readById(id).subscribe({
      next: (response) => {
        this.user = response.data as User;

        // Precarga para EDITAR (PUT) reutilizando createData
        this.createData = {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          email: this.user.email
        };

        this.editMode = false;
        this.loading = false;

        // Carga del estado del trabajador desde localStorage
        this.loadEstado(this.user.id);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'No se pudo cargar el trabajador.';
        this.loading = false;
      }
    });
  }

  /**
   * Crea un nuevo trabajador (POST).
   * Como la API es de pruebas, se guarda el trabajador creado en localStorage
   * para simular persistencia en la aplicación.
   */
  public create(): void {
    this.successMessage = '';
    this.errorMessage = '';

    // Validación básica del formulario
    if (
      !this.createData.first_name?.trim() ||
      !this.createData.last_name?.trim() ||
      !this.createData.email?.trim()
    ) {
      this.errorMessage = 'Rellena nombre, apellido y email.';
      return;
    }

    this._apiService.create(this.createData).subscribe({
      next: (res) => {

        /**
         * Construcción del objeto User local.
         * Se utiliza el id devuelto por la API (mock) y un avatar fijo.
         */
        const created: User = {
          id: Number(res.id),   // id que devuelve ReqRes
          first_name: this.createData.first_name!.trim(),
          last_name: this.createData.last_name!.trim(),
          email: this.createData.email!.trim(),
          avatar: 'https://reqres.in/img/faces/1-image.jpg'
        };

        // Se añade a localStorage para que aparezca también en el listado de trabajadores
        this.addCreatedUser(created);

        this.successMessage = 'Trabajador creado correctamente';
        this.createData = { first_name: '', last_name: '', email: '' };
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'No se pudo crear el trabajador.';
      }
    });
  }

  /**
   * Actualiza los datos del trabajador seleccionado (PUT).
   */
  public update(): void {
    if (!this.selectedId) return;

    this.successMessage = '';
    this.errorMessage = '';

    // Validación básica del formulario
    if (
      !this.createData.first_name?.trim() ||
      !this.createData.last_name?.trim() ||
      !this.createData.email?.trim()
    ) {
      this.errorMessage = 'Rellena nombre, apellido y email.';
      return;
    }

    // Payload enviado a la API
    const payload = {
      first_name: this.createData.first_name,
      last_name: this.createData.last_name,
      email: this.createData.email
    };

    this._apiService.update(this.selectedId, payload).subscribe({
      next: () => {
        this.successMessage = 'Trabajador actualizado correctamente.';

        // Actualiza la tarjeta inmediatamente en pantalla
        if (this.user) {
          this.user.first_name = payload.first_name;
          this.user.last_name = payload.last_name;
          this.user.email = payload.email;
        }

        // Guarda el estado seleccionado y sale del modo edición
        this.estadoSeleccionado = this.estadoEdit;
        this.saveEstado();
        this.editMode = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'No se pudo actualizar el trabajador.';
      }
    });
  }

  /**
   * Elimina un trabajador (DELETE).
   * Al tratarse de una API de pruebas, la eliminación se simula guardando el ID
   * en localStorage para que no vuelva a mostrarse en el listado.
   */
  public remove(): void {
    if (!this.selectedId) return;

    const ok = confirm('¿Seguro que quieres eliminar este trabajador?');
    if (!ok) return;

    this.successMessage = '';
    this.errorMessage = '';

    this._apiService.delete(this.selectedId).subscribe({
      next: () => {
        // Marca el ID como borrado en localStorage
        this.markDeleted(this.selectedId!);

        this.successMessage = 'Trabajador eliminado (mock).';

        // Limpia la vista detalle sin necesidad de navegar
        this.user = null;
        this.selectedId = null;
        this.createData = { first_name: '', last_name: '', email: '' };
        this.editMode = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'No se pudo eliminar el trabajador.';
      }
    });
  }

  /**
   * Activa el modo edición, copiando el estado actual a estadoEdit.
   */
  public startEdit(): void {
    if (!this.user) return;
    this.successMessage = '';
    this.errorMessage = '';
    this.estadoEdit = this.estadoSeleccionado;
    this.editMode = true;
  }

  /**
   * Cancela la edición, restaurando datos y estado original.
   */
  public cancelEdit(): void {
    this.editMode = false;

    // Restaura los datos del formulario con los valores actuales del usuario
    if (this.user) {
      this.createData = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email
      };
    }

    // Restaura el estado previo a la edición
    this.estadoEdit = this.estadoSeleccionado;
  }

  /**
   * Guarda el estado del trabajador en localStorage (mapa id -> estado).
   */
  public saveEstado(): void {
    if (!this.selectedId) return;

    const map = this.getStatesMap();
    map[this.selectedId] = this.estadoSeleccionado;
    this.saveStatesMap(map);
  }

  /**
   * Guarda un id en localStorage para marcarlo como eliminado.
   */
  private markDeleted(id: number): void {
    const raw = localStorage.getItem('deletedUserIds');
    const ids: number[] = raw ? JSON.parse(raw) : [];

    if (!ids.includes(id)) ids.push(id);

    localStorage.setItem('deletedUserIds', JSON.stringify(ids));
  }

  /**
   * Recupera los usuarios creados manualmente desde localStorage.
   */
  private getCreatedUsers(): User[] {
    const raw = localStorage.getItem('createdUsers');
    return raw ? JSON.parse(raw) : [];
  }

  /**
   * Guarda la lista de usuarios creados manualmente en localStorage.
   */
  private saveCreatedUsers(users: User[]): void {
    localStorage.setItem('createdUsers', JSON.stringify(users));
  }

  /**
   * Añade un usuario creado a la lista persistida en localStorage.
   */
  private addCreatedUser(user: User): void {
    const users = this.getCreatedUsers();
    users.push(user);
    this.saveCreatedUsers(users);
  }

  /**
   * Recupera el mapa de estados desde localStorage.
   * Formato: { [id: number]: "En proceso" | "Contratado" | "Despedido" }
   */
  private getStatesMap(): Record<number, string> {
    const raw = localStorage.getItem('userStates');
    return raw ? JSON.parse(raw) : {};
  }

  /**
   * Guarda el mapa de estados en localStorage.
   */
  private saveStatesMap(map: Record<number, string>): void {
    localStorage.setItem('userStates', JSON.stringify(map));
  }

  /**
   * Carga el estado de un trabajador desde localStorage.
   * Si no existe, se asigna el estado por defecto "En proceso".
   */
  private loadEstado(id: number): void {
    const map = this.getStatesMap();
    this.estadoSeleccionado = map[id] ?? 'En proceso';
  }
}