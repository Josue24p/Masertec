import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://masertecperu.com/api';     // URL backend principal
  private authUrl = 'https://masertecperu.com/login/api/auth'; // URL backend login

  constructor(private http: HttpClient) { }

  // --- Estado del servidor ---
  getServerStatus(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }

  // --- Contactos ---
  getContactos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/contacto`);
  }

  enviarContacto(contactData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contacto`, contactData);
  }

  // --- Subcategorías ---
  getSubcategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/subcategorias/subcategorias`);
  }

  // --- Productos ---
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/producto/productos`);
  }

  crearProducto(producto: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/producto`, producto);
  }

  actualizarProducto(id_producto: number, producto: FormData) {
    return this.http.put(`${this.apiUrl}/producto/${id_producto}`, producto);
  }
  // --- Login ---
  login(data: { email_usuario: string; password_usuario: string }): Observable<any> {
    return this.http.post<any>(this.authUrl, data, {
      headers: { 'Content-Type': 'application/json' } // importante
    });
  }
}
