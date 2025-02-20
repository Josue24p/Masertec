import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:4000'; // URL del backend en Node.js

  constructor(private http: HttpClient) {}
  //traer mensaje de confirmación de conexión bk
  getServerStatus(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
  
  //traer registro de contactanos
  getContactos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/contacto`);
  }

  // Método para enviar los datos de contacto al backend
  enviarContacto(contactData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/contacto`, contactData);
  }  
   // Método para obtener subcategorías
  getSubcategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/subcategorias`);
  }

  // Obtener todos los productos
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/productos`);
  }

  // Crear un nuevo producto
  crearProducto(producto: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/productos`, producto);
  }

 
  actualizarProducto(id_producto: number, producto: FormData) {
    return this.http.put(`http://localhost:4000/admin/productos/${id_producto}`, producto);
  }

  
  
  
}
