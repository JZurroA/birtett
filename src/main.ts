/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * main.ts
 * Punto de entrada de la aplicación Angular.
 * Se encarga de arrancar la aplicación y cargar el módulo raíz.
 */

import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

/**
 * Inicializa la plataforma del navegador y arranca la aplicación
 * utilizando el módulo raíz (AppModule).
 */
platformBrowser()
  .bootstrapModule(AppModule, {
    /**
     * Optimiza el rendimiento agrupando eventos del navegador
     * dentro de Angular (mejora ligera en aplicaciones medianas/grandes).
     */
    ngZoneEventCoalescing: true,
  })
  /**
   * Captura y muestra por consola cualquier error ocurrido
   * durante el arranque de la aplicación.
   */
  .catch(err => console.error(err));