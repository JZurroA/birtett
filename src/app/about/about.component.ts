/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * about.component.ts
 * Componente encargado de mostrar la información “Acerca de” la aplicación.
 */

import { Component } from '@angular/core';

@Component({
  /**
   * Selector del componente.
   */
  selector: 'app-about',

  /**
   * Indica que el componente forma parte de un módulo
   * y no es standalone.
   */
  standalone: false,

  /**
   * Plantilla HTML asociada al componente.
   */
  templateUrl: './about.component.html',

  /**
   * Hoja de estilos específica del componente.
   */
  styleUrl: './about.component.css'
})
export class AboutComponent {

  /**
   * Componente de tipo informativo.
   * No contiene lógica adicional.
   */
}