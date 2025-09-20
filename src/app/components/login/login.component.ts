import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    const loginData = {
      email_usuario: this.email,
      password_usuario: this.password
    };

    this.apiService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);

        if (response.token) {
          // ✅ Usamos AuthService
          this.authService.saveSession(response.token, response.usuario);
        }

        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.errorMessage = err.error?.error || 'Usuario o contraseña incorrectos';
      }
    });
  }
}
