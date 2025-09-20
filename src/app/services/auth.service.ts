import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  // ✅ Guardar token y usuario
  saveSession(token: string, usuario?: any): void {
    localStorage.setItem('token', token);
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  }

  // ✅ Obtener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ Saber si está logueado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ✅ Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/acces']); // Redirigir al login
  }
}
