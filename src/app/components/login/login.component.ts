import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

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

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    // 🔹 enviar JSON en lugar de FormData
    const loginData = {
      email_usuario: this.email,
      password_usuario: this.password
    };

    this.apiService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);

        if (response.token) {
          localStorage.setItem('token', response.token);
        }

        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
