/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * login.component.spec.ts
 * Pruebas unitarias básicas del componente LoginComponent.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {

  /**
   * Instancia del componente a probar.
   */
  let component: LoginComponent;

  /**
   * Fixture que permite acceder al componente
   * y a su representación en el DOM.
   */
  let fixture: ComponentFixture<LoginComponent>;

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
        LoginComponent
      ]
    })
    .compileComponents();

    /**
     * Creación de la instancia del componente
     * y activación de la detección de cambios.
     */
    fixture = TestBed.createComponent(LoginComponent);
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