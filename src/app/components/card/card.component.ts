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
  @Input() route!: string; // Nueva propiedad para la ruta

  constructor(private router: Router) { }

  onButtonClick() {
    if (this.route) {
      this.router.navigate([this.route])
    }
  }
}
