/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * footer.component.ts
 * Componente encargado de mostrar el pie de página de la aplicación.
 */

import { Component } from '@angular/core';

@Component({
  /**
   * Selector del componente.
   */
  selector: 'app-footer',

  /**
   * Indica que el componente forma parte de un módulo
   * y no es standalone.
   */
  standalone: false,

  /**
   * Plantilla HTML asociada al componente.
   */
  templateUrl: './footer.component.html',

  /**
   * Hoja de estilos específica del componente.
   */
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  /**
   * Año actual mostrado en el pie de página.
   */
  public year: number;

  /**
   * Inicializa el año con el valor actual del sistema.
   */
  constructor() {
    this.year = new Date().getFullYear();
  }
}