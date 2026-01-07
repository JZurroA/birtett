/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * auth.guard.ts
 * Guard de autenticación que protege las rutas privadas de la aplicación.
 * Impide el acceso a usuarios no autenticados.
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    /**
     * El guard se proporciona a nivel global.
     */
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    /**
     * Inyección del servicio de autenticación y del router.
     */
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    /**
     * Método que se ejecuta antes de activar una ruta protegida.
     * Devuelve true si el usuario está autenticado.
     * En caso contrario, redirige al login.
     */
    canActivate(): boolean {

        // Si el usuario ha iniciado sesión, se permite el acceso
        if (this.authService.isLoggedIn()) {
            return true;
        }

        // Si no está autenticado, se redirige al login
        this.router.navigate(['/login']);
        return false;
    }
}