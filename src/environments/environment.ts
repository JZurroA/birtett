/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * environment.ts
 * Configuración de entorno para la aplicación.
 * Contiene variables globales accesibles desde cualquier parte del proyecto.
 */

export const environment = {
    /**
     * URL base de la API utilizada por la aplicación.
     * En este caso se emplea una API pública de prueba (ReqRes).
     */
    apiUrl: 'https://reqres.in/api/users',

    /**
     * Clave de acceso simulada para la API.
     * Se utiliza únicamente con fines educativos.
     */
    apiKey: 'reqres_ec2e70333d6f4681bd5cbf4b3b44f278',

    /**
     * Credenciales del usuario administrador.
     * Usadas para la autenticación básica en la aplicación.
     */
    adminUser: 'admin',
    adminPass: 'admin'
};