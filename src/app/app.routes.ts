import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { ProductComponent } from './components/product/product.component';

export const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"servicios",
    component:ServicioComponent
  },
  {
    path:"product",
    component:ProductComponent
  }
];
