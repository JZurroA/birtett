/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * app.component.ts
 * Componente raíz de la aplicación Angular.
 * Actúa como contenedor principal de la SPA.
 */

import { Component } from '@angular/core';

@Component({
  /**
   * Selector del componente.
   * Se utiliza en index.html como <app-root>.
   */
  selector: 'app-root',

  /**
   * Plantilla HTML asociada al componente.
   */
  templateUrl: './app.component.html',

  /**
   * Indica que este componente no es standalone
   * y forma parte de un módulo (AppModule).
   */
  standalone: false,

  /**
   * Hoja de estilos específica del componente.
   */
  styleUrl: './app.component.css'
})
export class AppComponent {

  /**
   * Título de la aplicación.
   * Se utiliza en la plantilla para mostrar información básica.
   */
  title = 'zurro-aduriz-jabier-te06-ett-portal';
}