import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  private admin$ = new BehaviorSubject<boolean>(this.checkAdmin());

  constructor(private router: Router) {}

  // Guardar token y usuario
  saveSession(token: string, usuario?: any): void {
    localStorage.setItem('token', token);
    if (usuario) localStorage.setItem('usuario', JSON.stringify(usuario));
    this.loggedIn$.next(true);
    this.admin$.next(this.isAdmin());
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUsuario(): any {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  isAdmin(): boolean {
  const usuario = this.getUsuario();
  if (!usuario?.rol) return false;

  const rol = usuario.rol.toString().trim().toLowerCase();
  return rol === 'administrador' || rol === 'admin' || rol === '1';
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.loggedIn$.next(false);
    this.admin$.next(false);
    this.router.navigate(['/acces']);
  }

  // Para que los componentes se suscriban
  getLoggedIn$() {
    return this.loggedIn$.asObservable();
  }

  getAdmin$() {
    return this.admin$.asObservable();
  }

  // Métodos internos
  private hasToken(): boolean {
    return !!this.getToken();
  }

  private checkAdmin(): boolean {
    return this.isAdmin();
  }
}
