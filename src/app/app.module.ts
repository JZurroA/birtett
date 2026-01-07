/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * app.module.ts
 * Módulo raíz de la aplicación Angular.
 * Centraliza la declaración de componentes y la importación de módulos.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

/* Módulo de enrutamiento de la aplicación */
import { Routing, AppRoutingProviders } from './app.routing';

/* Componente raíz */
import { AppComponent } from './app.component';

/* Componentes de la aplicación */
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { LoginComponent } from './login/login.component';
import { AdministrarComponent } from './administrar/administrar.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';

@NgModule({
  /**
   * Componentes, directivas y pipes que pertenecen a este módulo.
   */
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ServiciosComponent,
    LoginComponent,
    AdministrarComponent,
    TrabajadoresComponent
  ],

  /**
   * Módulos externos que necesita la aplicación.
   */
  imports: [
    BrowserModule,     // Necesario para ejecutar Angular en el navegador
    Routing,           // Sistema de rutas de la aplicación
    HttpClientModule,  // Comunicación con APIs mediante HTTP
    FormsModule        // Manejo de formularios con template-driven forms
  ],

  /**
   * Servicios y proveedores disponibles a nivel global.
   */
  providers: [
    AppRoutingProviders
  ],

  /**
   * Componente raíz que se carga al iniciar la aplicación.
   */
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }