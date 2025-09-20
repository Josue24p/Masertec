import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css'
})
export class AdminComponent {
  mostrarFormulario: boolean = true;
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
