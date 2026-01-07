/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * trabajadores.component.ts
 * Componente encargado de mostrar y gestionar el listado de trabajadores.
 * Combina datos obtenidos desde una API externa con datos almacenados localmente.
 */

import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';

import { ApiService } from '../services/api.service';
import { User } from '../models/user.model';

@Component({
  /**
   * Selector del componente.
   */
  selector: 'app-trabajadores',

  /**
   * Indica que el componente forma parte de un módulo
   * y no es standalone.
   */
  standalone: false,

  /**
   * Plantilla HTML del componente.
   */
  templateUrl: './trabajadores.component.html',

  /**
   * Hoja de estilos específica del componente.
   */
  styleUrl: './trabajadores.component.css',

  /**
   * Proveedor del servicio API a nivel de componente.
   * Cada instancia del componente tiene su propio servicio.
   */
  providers: [ApiService]
})
export class TrabajadoresComponent {

  /**
   * Listado final de trabajadores a mostrar en la vista.
   */
  public trabajadores: User[] = [];

  /**
   * Indica si los datos se están cargando.
   * Se utiliza para mostrar spinners o mensajes de espera.
   */
  public loading: boolean = true;

  /**
   * Mensaje de error mostrado en caso de fallo en la carga de datos.
   */
  public errorMessage: string = '';

  /**
   * Inyección del servicio de comunicación con la API.
   */
  constructor(private _apiService: ApiService) {}

  /**
   * Método del ciclo de vida del componente.
   * Se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.getAll();
  }

  /**
   * Obtiene el listado completo de trabajadores.
   * Combina datos de la API con datos locales,
   * elimina usuarios borrados y evita duplicados.
   */
  public getAll(): void {
    this.loading = true;
    this.errorMessage = '';

    /**
     * forkJoin permite ejecutar varias peticiones HTTP en paralelo
     * y continuar cuando todas han finalizado correctamente.
     */
    forkJoin([
      this._apiService.read(1),
      this._apiService.read(2)
    ]).subscribe({
      next: ([r1, r2]) => {

        /**
         * Usuarios obtenidos desde la API (páginas 1 y 2).
         */
        const apiUsers: User[] = [
          ...(r1.data as User[]),
          ...(r2.data as User[]),
        ];

        /**
         * Usuarios creados manualmente y almacenados en localStorage.
         */
        const createdUsers: User[] = this.getCreatedUsers();

        /**
         * IDs de usuarios eliminados almacenados en localStorage.
         */
        const deletedIds: number[] = this.getDeletedIds();

        /**
         * Combinación de usuarios de la API y locales,
         * excluyendo los usuarios marcados como eliminados.
         */
        const combined = [...apiUsers, ...createdUsers]
          .filter(u => !deletedIds.includes(u.id));

        /**
         * Se utiliza un Map para evitar duplicados por id.
         * Si existe el mismo id, el último valor sobrescribe al anterior.
         */
        const map = new Map<number, User>();
        combined.forEach(u => map.set(u.id, u));

        /**
         * Conversión final a array y ordenación por id.
         */
        this.trabajadores = Array.from(map.values())
          .sort((a, b) => a.id - b.id);

        this.loading = false;
      },

      /**
       * Manejo de errores durante la carga de datos.
       */
      error: err => {
        console.error(err);
        this.errorMessage = 'No se pudieron cargar los trabajadores.';
        this.loading = false;
      }
    });
  }

  /**
   * Recupera los usuarios creados manualmente
   * desde el almacenamiento local del navegador.
   */
  private getCreatedUsers(): User[] {
    const raw = localStorage.getItem('createdUsers');
    return raw ? JSON.parse(raw) : [];
  }

  /**
   * Recupera los identificadores de usuarios eliminados
   * desde el almacenamiento local del navegador.
   */
  private getDeletedIds(): number[] {
    const raw = localStorage.getItem('deletedUserIds');
    return raw ? JSON.parse(raw) : [];
  }

}