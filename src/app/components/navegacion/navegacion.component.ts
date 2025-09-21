import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';  // ✅ Importa CommonModule
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [CommonModule, RouterModule],  // ✅ Agrega aquí
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getLoggedIn$().subscribe(status => this.isLoggedIn = status);
    this.authService.getAdmin$().subscribe(status => this.isAdmin = status);
  }


  
  logout(): void {
    this.authService.logout();
  }
}
