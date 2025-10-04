import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title!: string;
  @Input() imageUrl!: string;
  @Input() text!: string;
  @Input() buttonText: string = 'Ver más';
  @Input() showButton: boolean = false;
  @Input() route?: string; // Ruta interna
  @Input() externaUrl?: string; // Enlace externo

  @Output() verMas = new EventEmitter<void>();

  constructor(private router: Router) {}

  onButtonClick() {
    console.log('Card onButtonClick →', { title: this.title, route: this.route, externaUrl: this.externaUrl });
    if (this.externaUrl) {
      window.open(this.externaUrl, '_blank');
      return;
    }
    if (this.route) {
      this.router.navigate([this.route]);
      return;
    }
    // emitir evento al padre
    this.verMas.emit();
  }
}
