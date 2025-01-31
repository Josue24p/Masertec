import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // URL del backend en Node.js

  constructor(private http: HttpClient) {}
  //traer mensaje de confirmación de conexión bk
  getServerStatus(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
  
  //traer registro de contactanos
  getContactos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/contactos`);
  }

  // Método para enviar los datos de contacto al backend
  enviarContacto(contactData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contactos`, contactData);
  }  
  
}
