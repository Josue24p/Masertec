import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { ProductComponent } from './components/product/product.component';
import { SistemasComponent } from './components/sistemas/sistemas.component';
import { SoporteComponent } from './components/soporte/soporte.component';
import { AccesoriosComponent } from './components/accesorios/accesorios.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "servicios",
    component: ServicioComponent
  },
  {
    path: "product",
    component: ProductComponent
  },
  {
    path: "sistema",
    component: SistemasComponent
  },
  {
    path: "soporte",
    component: SoporteComponent
  },
  {
    path: "accesorio",
    component: AccesoriosComponent
  }
];
