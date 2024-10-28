import { Component } from '@angular/core';
import { CardComponent } from '../../targs/card/card.component';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
