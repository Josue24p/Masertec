import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://masertecperu.com/api'; // URL del backend en Node.js

  constructor(private http: HttpClient) { }
  //traer mensaje de confirmación de conexión bk
  getServerStatus(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }

  //traer registro de contactanos
  getContactos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/contacto`);
  }

  // Método para enviar los datos de contacto al backend
  enviarContacto(contactData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contacto`, contactData);
  }
  // Método para obtener subcategorías
  getSubcategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/subcategorias/subcategorias`);
  }

  // Obtener todos los productos
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/producto/productos`);
  }

  // Crear un nuevo producto
  crearProducto(producto: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/producto`, producto);
  }


  actualizarProducto(id_producto: number, producto: FormData) {
    return this.http.put(`https://masertecperu.com/api/producto/${id_producto}`, producto);
  }

  login(data: FormData): Observable<any>{
    return this.http.post<any>('https://masertecperu.com/login/api/auth', data)
  }




}
