/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * login.component.ts
 * Componente encargado de gestionar el inicio de sesión del usuario.
 * Valida las credenciales y controla la navegación tras el login.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Login } from '../models/login.model';

@Component({
  /**
   * Selector del componente.
   */
  selector: 'app-login',

  /**
   * Indica que el componente forma parte de un módulo
   * y no es standalone.
   */
  standalone: false,

  /**
   * Plantilla HTML asociada al componente.
   */
  templateUrl: './login.component.html',

  /**
   * Hoja de estilos específica del componente.
   */
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   * Modelo que almacena los datos introducidos en el formulario.
   */
  public loginData: Login = {
    username: '',
    password: ''
  };

  /**
   * Mensaje de error mostrado en la vista.
   */
  public errorMessage = '';

  /**
   * Inyección del servicio de autenticación y del router.
   */
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  /**
   * Maneja el envío del formulario de login.
   * Valida los datos introducidos y realiza la autenticación.
   */
  public onSubmit(): void {
    this.errorMessage = '';

    /**
     * Validación básica de campos vacíos.
     */
    if (!this.loginData.username.trim() || !this.loginData.password.trim()) {
      this.errorMessage = 'Introduce usuario y contraseña.';
      return;
    }

    /**
     * Intento de autenticación mediante el servicio AuthService.
     */
    const logged = this._authService.login(
      this.loginData.username,
      this.loginData.password
    );

    /**
     * Si las credenciales no son válidas, se muestra un error.
     */
    if (!logged) {
      this.errorMessage = 'Usuario o contraseña incorrectos.';
      return;
    }

    /**
     * Redirección al panel de administración tras login correcto.
     */
    this._router.navigate(['/administrar']);
  }
}