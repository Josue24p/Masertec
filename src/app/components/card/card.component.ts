import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() title!: string;
  @Input() imageUrl!: string;
  @Input() text!: string;
  @Input() buttonText: string = 'Ver más';
  @Input() showButton: boolean = false;
  @Input() route?: string; // Nueva propiedad para la ruta
  @Input() externaUrl?: string; // Nueva propiedad para enlaces externos

  constructor(private router: Router) { }

  onButtonClick() {
    if (this.externaUrl) {
      // Redirigir a una pestaña externa
      window.open(this.externaUrl); // Abre en una pestaña nueva
    }
    if (this.route) {
      // Redirigir internamente usando el router de Angular
      this.router.navigate([this.route])
    }
  }
}
