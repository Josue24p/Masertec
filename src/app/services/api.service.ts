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

  // --- Estado del servidor 
  /*getServerStatus(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }*/

  // --- Contactos ---
  getContactos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/contacto`);
  }

  enviarContacto(contactData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contacto`, contactData);
  }

  enviarCorreoContacto(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contacto/enviar-correo`, data);
  }


  // --- Categorías ---
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categoria`);
  }

  crearCategoria(categoria: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/categoria`, categoria);
  }

  actualizarCategoria(id_categoria: number, categoria: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/categoria/${id_categoria}`, categoria);
  }

  eliminarCategoria(id_categoria: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/categoria/${id_categoria}`);
  }

  getCategoria(id_categoria: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categoria/${id_categoria}`);
  }



  // --- Subcategorías ---
  getSubcategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/subcategorias`);
  }

  getSubcategoriasPaginadas(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/subcategorias?page=${page}&limit=${limit}`);
  }

  crearSubcategoria(subcategoria: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/subcategorias`, subcategoria);
  }

  actualizarSubcategoria(id_subcategoria: number, subcategoria: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/subcategorias/${id_subcategoria}`, subcategoria);
  }

  eliminarSubcategoria(id_subcategoria: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/subcategorias/${id_subcategoria}`);
  }

  getSubcategoria(id_subcategoria: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/subcategorias/${id_subcategoria}`);
  }

  getSubcategoriasByCategoria(id_categoria: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/subcategorias/categoria/${id_categoria}`);
  }


  // --- Productos con paginación ---
  getProductos(page: number = 1, limit: number = 5): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/producto?page=${page}&limit=${limit}`);
  }

  crearProducto(producto: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/producto`, producto);
  }

  actualizarProducto(id_producto: number, producto: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/producto/${id_producto}`, producto);
  }

  eliminarProducto(id_producto: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/producto/${id_producto}`);
  }

  getProducto(id_producto: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/producto/${id_producto}`);
  }

  // --- Productos por subcategoría con paginación ---
  getProductosBySubcategoria(id_subcategoria: number, page: number = 1, limit: number = 5): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/producto/subcategoria/${id_subcategoria}`);
  }


  // --- Login ---
  login(data: { email_usuario: string; password_usuario: string }): Observable<any> {
    return this.http.post<any>(this.authUrl, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // --- Manejo del token ---
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
