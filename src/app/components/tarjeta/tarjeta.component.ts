import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tarjeta',
    imports: [CommonModule],
    templateUrl: './tarjeta.component.html',
    styleUrl: './tarjeta.component.css'
})
export class TarjetaComponent {
  @Input() title!: string;
  @Input() imageUrl!: string;
  @Input() buttonText: string = 'Ver más';
  @Input() showButton: boolean = false;
  @Input() route!: string;

  constructor(private router: Router) { }

  onButtonClick() {
    if (this.route)
      this.router.navigate([this.route]);
  }
}
