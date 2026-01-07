/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * auth.service.ts
 * Servicio encargado de la autenticación básica de la aplicación.
 * Gestiona el estado de inicio de sesión del usuario.
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
    /**
     * El servicio se proporciona a nivel global.
     * Existe una única instancia durante toda la aplicación.
     */
    providedIn: 'root'
})
export class AuthService {

    /**
     * Indica si el usuario está autenticado.
     */
    private loggedIn = false;

    constructor(private _router: Router) {}

    /**
     * Devuelve el estado actual de autenticación.
     */
    isLoggedIn(): boolean {
        return this.loggedIn;
    }

    /**
     * Comprueba las credenciales introducidas por el usuario.
     * Si coinciden con las configuradas en el entorno,
     * se marca al usuario como autenticado.
     */
    login(username: string, password: string): boolean {
        const logged =
            username === environment.adminUser &&
            password === environment.adminPass;

        this.loggedIn = logged;
        return logged;
    }

    /**
     * Cierra la sesión del usuario.
     */
    logout(): void {
        this.loggedIn = false;
        this._router.navigate(['/login']);
    }
}