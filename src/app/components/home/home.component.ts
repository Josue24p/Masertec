import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent],
  providers: [ApiService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mostrarFormulario: boolean = false;
  categorias: any[] = [];
  subcategorias: any[] = [];
  productos: any[] = [];

  categoriaSeleccionada: any = null;
  subcategoriaSeleccionada: any = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.apiService.getCategorias().subscribe({
      next: (data) => {
        console.log('Categorias API response:', data);
        this.categorias = Array.isArray(data) ? data : (data || []);
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  seleccionarCategoria(categoria: any) {
    console.log('seleccionarCategoria ->', categoria);
    this.categoriaSeleccionada = categoria;

    this.apiService.getSubcategoriasByCategoria(categoria.id_categoria).subscribe({
      next: (data) => {
        console.log('Subcategorias API response:', data);
        this.subcategorias = Array.isArray(data) ? data : [];
      },
      error: (err) => {
        console.error('Error al cargar subcategorías:', err);
        this.subcategorias = [];
      }
    });
  }

  seleccionarSubcategoria(sub: any) {
    console.log('seleccionarSubcategoria ->', sub);
    this.subcategoriaSeleccionada = sub;

    this.apiService.getProductosBySubcategoria(sub.id_subcategoria).subscribe({
      next: (data) => {
        console.log('Productos API response:', data);
        this.productos = Array.isArray(data) ? data : [];
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.productos = [];
      }
    });
  }

  volverACategorias() {
    this.categoriaSeleccionada = null;
    this.subcategoriaSeleccionada = null;
    this.subcategorias = [];
    this.productos = [];
  }

  volverASubcategorias() {
    this.subcategoriaSeleccionada = null;
    this.productos = [];
  }
}
