/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * app.component.spec.ts
 * Pruebas unitarias del componente raíz de la aplicación.
 */

import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  /**
   * Configuración inicial del entorno de pruebas.
   * Se ejecuta antes de cada test.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      /**
       * Se importa RouterModule para evitar errores
       * en componentes que utilizan enrutamiento.
       */
      imports: [
        RouterModule.forRoot([])
      ],

      /**
       * Declaración del componente que se va a probar.
       */
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  /**
   * Comprueba que el componente se crea correctamente.
   */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /**
   * Comprueba que la propiedad title tiene el valor esperado.
   */
  it(`should have as title 'zurro-aduriz-jabier-te06-ett-portal'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zurro-aduriz-jabier-te06-ett-portal');
  });

  /**
   * Comprueba que el título se renderiza correctamente en la plantilla.
   */
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);

    // Fuerza la detección de cambios para renderizar la plantilla
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelector('h1')?.textContent
    ).toContain('Hello, zurro-aduriz-jabier-te06-ett-portal');
  });
});