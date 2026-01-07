/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * user.model.ts
 * Modelo que representa a un usuario/trabajador de la aplicación.
 * Define la estructura de los datos recibidos desde la API.
 */

export interface User {

    /**
     * Identificador único del usuario.
     */
    id: number;

    /**
     * Correo electrónico del usuario.
     */
    email: string;

    /**
     * Nombre del usuario.
     */
    first_name: string;

    /**
     * Apellidos del usuario.
     */
    last_name: string;

    /**
     * URL del avatar del usuario.
     */
    avatar: string;
}