import { Component } from '@angular/core';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';

@Component({
  selector: 'app-servicio',
  standalone: true,
  imports: [TarjetaComponent],
  templateUrl: './servicio.component.html',
  styleUrl: './servicio.component.css'
})
export class ServicioComponent {

}
