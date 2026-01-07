/**
 * Autor: Jabier Zurro Aduriz
 * Fecha: 31/12/2025
 * Asignatura: DWEC
 * Proyecto: TE06 - Portal de gestión de ETT
 * api.service.ts
 * Servicio encargado de la comunicación con la API externa.
 * Centraliza las operaciones CRUD relacionadas con los usuarios.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

    /**
     * URL base de la API.
     */
    private url: string;

    /**
     * Clave de acceso a la API.
     */
    private apiKey: string;

    /**
     * Inyección del cliente HTTP de Angular.
     */
    constructor(private _http: HttpClient) {
        this.url = environment.apiUrl;
        this.apiKey = environment.apiKey;
    }

    /**
     * Genera las cabeceras HTTP necesarias para las peticiones.
     */
    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': this.apiKey
        });
    }

    /**
     * Crea un nuevo usuario en la API.
     */
    create(usuario: any): Observable<any> {
        return this._http.post(
            this.url,
            usuario,
            { headers: this.getHeaders() }
        );
    }

    /**
     * Obtiene una lista de usuarios paginada.
     */
    read(page: number): Observable<any> {
        return this._http.get(
            this.url + '?page=' + page,
            { headers: this.getHeaders() }
        );
    }

    /**
     * Obtiene un usuario concreto por su identificador.
     */
    readById(id: number): Observable<any> {
        return this._http.get(
            this.url + '/' + id,
            { headers: this.getHeaders() }
        );
    }

    /**
     * Actualiza los datos de un usuario existente.
     */
    update(idUsuario: number, datos: any): Observable<any> {
        return this._http.put(
            this.url + '/' + idUsuario,
            datos,
            { headers: this.getHeaders() }
        );
    }

    /**
     * Elimina un usuario por su identificador.
     */
    delete(idUsuario: number): Observable<any> {
        return this._http.delete(
            this.url + '/' + idUsuario,
            { headers: this.getHeaders() }
        );
    }
}