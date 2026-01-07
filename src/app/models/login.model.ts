/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * login.model.ts
 * Modelo que representa las credenciales de acceso de un usuario.
 */

export interface Login {

    /**
     * Nombre de usuario.
     */
    username: string;

    /**
     * Contraseña del usuario.
     */
    password: string;
}