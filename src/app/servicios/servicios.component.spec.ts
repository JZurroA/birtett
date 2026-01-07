/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * servicios.component.spec.ts
 * Pruebas unitarias básicas del componente ServiciosComponent.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiciosComponent } from './servicios.component';

describe('ServiciosComponent', () => {

  /**
   * Instancia del componente a probar.
   */
  let component: ServiciosComponent;

  /**
   * Fixture que permite acceder al componente
   * y a su representación en el DOM.
   */
  let fixture: ComponentFixture<ServiciosComponent>;

  /**
   * Configuración inicial del entorno de pruebas.
   * Se ejecuta antes de cada test.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      /**
       * Declaración del componente bajo prueba.
       */
      declarations: [
        ServiciosComponent
      ]
    })
    .compileComponents();

    /**
     * Creación de la instancia del componente
     * y activación de la detección de cambios.
     */
    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Comprueba que el componente se crea correctamente.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});