import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { ProductComponent } from './components/product/product.component';
import { SistemasComponent } from './components/sistemas/sistemas.component';
import { SoporteComponent } from './components/soporte/soporte.component';
import { AccesoriosComponent } from './components/accesorios/accesorios.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { FotocheckComponent } from './components/fotocheck/fotocheck.component';
import { EtiquetaComponent } from './components/etiqueta/etiqueta.component';
import { ImpresorasComponent } from './components/impresoras/impresoras.component';
import { ImpretiquetasComponent } from './components/impretiquetas/impretiquetas.component';
import { RelojesComponent } from './components/relojes/relojes.component';
import { LectorasComponent } from './components/lectoras/lectoras.component';

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
  },
  {
    path: "contacto",
    component: ContactoComponent
  },
  {
    path: "fotocheck",
    component: FotocheckComponent
  },
  {
    path: "etiqueta",
    component: EtiquetaComponent
  },
  {
    path: "impresoras",
    component: ImpresorasComponent
  },
  {
    path: "impretiquetas",
    component: ImpretiquetasComponent
  },
  {
    path: "relojes",
    component: RelojesComponent
  },
  {
    path: "lectoras",
    component: LectorasComponent
  }
];
