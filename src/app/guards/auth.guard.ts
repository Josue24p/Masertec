// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload { exp?: number; }

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  console.log('[authGuard] run — token:', localStorage.getItem('token')); // <<-- línea de debug

  const token = localStorage.getItem('token');
  if (!token) return router.createUrlTree(['/acces']);

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp > now) return true;

    localStorage.removeItem('token');
    return router.createUrlTree(['/acces']);
  } catch {
    localStorage.removeItem('token');
    return router.createUrlTree(['/acces']);
  }
};
