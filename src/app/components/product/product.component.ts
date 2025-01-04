import { Component } from '@angular/core';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [TarjetaComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
