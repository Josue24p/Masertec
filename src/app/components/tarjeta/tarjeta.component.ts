import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css'
})
export class TarjetaComponent {
  @Input() title!: string;
  @Input() imageUrl!: string;
  @Input() buttonText: string = 'Ver más';

  constructor(private router: Router) { }

  onButtonClick() {
    this.router.navigate(['/']);
  }
}
