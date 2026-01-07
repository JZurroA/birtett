/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * header.component.ts
 * Componente encargado de mostrar la cabecera de la aplicación.
 * Controla la visualización de opciones según el estado de autenticación.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  /**
   * Selector del componente.
   */
  selector: 'app-header',

  /**
   * Indica que el componente forma parte de un módulo
   * y no es standalone.
   */
  standalone: false,

  /**
   * Plantilla HTML asociada al componente.
   */
  templateUrl: './header.component.html',

  /**
   * Hoja de estilos específica del componente.
   */
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  /**
   * Inyección del servicio de autenticación.
   * Se expone como público para poder usarlo directamente en la plantilla.
   */
  constructor(public authService: AuthService) {}
}