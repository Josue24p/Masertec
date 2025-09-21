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
import { SistemasVersionesComponent } from './components/sistemas-versiones/sistemas-versiones.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminListarComponent } from './components/admin-prod/admin-listar.component';
import { LoginComponent } from './components/login/login.component';
import { Component } from '@angular/core';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: "acces",
    component: LoginComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [authGuard]
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
  },
  {
    path: "versiones",
    component: SistemasVersionesComponent
  },
  {
    path: "adminlistar",
    component: AdminListarComponent,
     canActivate: [authGuard]
  },
  {
    path: "admin/contacto",
    component: ContactanosComponent,
     canActivate: [authGuard]
  }
];
