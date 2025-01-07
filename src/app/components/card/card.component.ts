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

  constructor(private router: Router) { }

  onButtonClick() {
    this.router.navigate(['/servicios']);
  }
}
