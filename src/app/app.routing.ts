/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * app.routing.ts
 * Configuración del sistema de rutas de la aplicación Angular.
 * Define la navegación entre componentes y la protección de rutas.
 */

import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Route } from "@angular/router";
import { AuthGuard } from './guards/auth.guard';

/* Componentes asociados a las distintas rutas */
import { InicioComponent } from "./inicio/inicio.component";
import { AboutComponent } from "./about/about.component";
import { ServiciosComponent } from "./servicios/servicios.component";
import { LoginComponent } from "./login/login.component";
import { TrabajadoresComponent } from "./trabajadores/trabajadores.component";
import { AdministrarComponent } from "./administrar/administrar.component";

/**
 * Definición de las rutas principales de la aplicación.
 * Cada ruta asocia una URL con un componente.
 */
const appRoutes: Routes = [
    /**
     * Ruta por defecto.
     * Redirige a /inicio cuando la URL está vacía.
     */
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },

    /* Rutas públicas */
    { path: 'inicio', component: InicioComponent },
    { path: 'about', component: AboutComponent },
    { path: 'servicios', component: ServiciosComponent },
    { path: 'login', component: LoginComponent },

    /**
     * Rutas protegidas.
     * Solo accesibles si el AuthGuard permite la navegación.
     */
    { path: 'trabajadores', component: TrabajadoresComponent, canActivate: [AuthGuard] },
    { path: 'administrar', component: AdministrarComponent, canActivate: [AuthGuard] },
    { path: 'administrar/:id', component: AdministrarComponent, canActivate: [AuthGuard] },

    /**
     * Ruta comodín.
     * Captura cualquier ruta no definida y redirige al inicio.
     */
    { path: '**', component: InicioComponent }
];

/**
 * Proveedores del sistema de rutas.
 * Se deja preparado para futuras ampliaciones.
 */
export const AppRoutingProviders: any[] = [];

/**
 * Módulo de enrutamiento principal.
 * Se importa en el módulo raíz de la aplicación.
 */
export const Routing: ModuleWithProviders<Route> =
    RouterModule.forRoot(appRoutes);