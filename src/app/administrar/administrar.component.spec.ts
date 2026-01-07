/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * administrar.component.spec.ts
 * Pruebas unitarias básicas del componente AdministrarComponent.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarComponent } from './administrar.component';

describe('AdministrarComponent', () => {

  /**
   * Instancia del componente a probar.
   */
  let component: AdministrarComponent;

  /**
   * Fixture que permite acceder al componente
   * y a su representación en el DOM.
   */
  let fixture: ComponentFixture<AdministrarComponent>;

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
        AdministrarComponent
      ]
    })
    .compileComponents();

    /**
     * Creación de la instancia del componente
     * y activación de la detección de cambios.
     */
    fixture = TestBed.createComponent(AdministrarComponent);
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