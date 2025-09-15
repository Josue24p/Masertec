import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-admin-listar',
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-listar.component.html',
    styleUrl: './admin-listar.component.css'
})
export class AdminListarComponent implements OnInit {
  subcategorias: any[] = [];
  productos: any[] = [];
  editando: boolean = false; 
  nuevoProducto = {
    id_producto: null,
    id_subcategoria: null,
    prod_nombre: '',
    prod_image: '',
    prod_descripcion: ''
  };
  imagenSeleccionada: File | null = null;
  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    // Obtener subcategorías
    this.ApiService.getSubcategorias().subscribe(
      (data) => {
        this.subcategorias = data;
      },
      (error) => {
        console.error('Error al obtener subcategorías', error);
      }
    );
    

    // Obtener productos
    this.ApiService.getProductos().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }
  cargarProductos(): void {
    this.ApiService.getProductos().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }
  
  onFileSelected(event: any) {
    this.imagenSeleccionada = event.target.files[0];
  }
  // Método para registrar un nuevo producto
  registrarProducto(): void {
    if (this.editando) return; 
    const formData = new FormData();
    formData.append('id_subcategoria', this.nuevoProducto.id_subcategoria!);
    formData.append('prod_nombre', this.nuevoProducto.prod_nombre);
    formData.append('prod_descripcion', this.nuevoProducto.prod_descripcion);
    if (this.imagenSeleccionada) {
      formData.append('prod_image', this.imagenSeleccionada);
    }
     // 🔹 Verifica que los datos se están agregando al FormData
  console.log("Contenido de FormData:");
  formData.forEach((value, key) => {
    console.log(`${key}:`, value);
  });

  // 🔹 Verifica que se está llamando a la API
  console.log("Enviando datos a la API...");

    this.ApiService.crearProducto(formData).subscribe(
      (response) => {
        console.log('Producto registrado con éxito', response);
        this.limpiarFormulario();
        // ✅ Alerta de éxito
      Swal.fire({
        title: '¡Éxito!',
        text: 'El producto ha sido registrado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.cargarProductos(); // ✅ Recarga la lista de productos sin refrescar la página
      });
      },
      (error) => {
        console.error('Error al registrar producto', error);
        // ❌ Alerta de error
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al registrar el producto.',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo'
      });
      }
    );
  }
  
  editarProducto(producto: any): void {
    this.nuevoProducto = {
      id_producto: producto.id_producto,
      id_subcategoria: producto.id_subcategoria,
      prod_nombre: producto.prod_nombre,
      prod_image: producto.prod_image, // Puedes manejar esto si quieres mostrar la imagen
      prod_descripcion: producto.prod_descripcion
    };
    this.editando = true; // Activamos el modo edición
  }
  // 🔹 Confirmar actualización
  actualizarProducto(): void {
    if (!this.nuevoProducto.id_producto) {
      console.error("Error: id_producto no definido");
      return;
    }

    const formData = new FormData();
    formData.append('id_subcategoria', this.nuevoProducto.id_subcategoria!);
    formData.append('prod_nombre', this.nuevoProducto.prod_nombre);
    formData.append('prod_descripcion', this.nuevoProducto.prod_descripcion);
    if (this.imagenSeleccionada) {
      formData.append('prod_image', this.imagenSeleccionada);
    }

    this.ApiService.actualizarProducto(this.nuevoProducto.id_producto, formData).subscribe(
      (response) => {
        console.log('Producto actualizado con éxito', response);
        this.limpiarFormulario();
         // ✅ Alerta de éxito
      Swal.fire({
        title: '¡Actualizado!',
        text: 'El producto ha sido actualizado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.cargarProductos(); // ✅ Recarga la lista sin refrescar toda la página
      });

      },
      (error) => {
        console.error('Error al actualizar producto', error);
        // ❌ Alerta de error
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el producto.',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo'
      });
      }
    );
  }

  // 🔹 Cancelar edición
  cancelarEdicion(): void {
    this.limpiarFormulario();
  }

  // 🔹 Limpiar formulario
  limpiarFormulario(): void {
    this.nuevoProducto = { id_producto: null, id_subcategoria: null, prod_nombre: '', prod_image: '', prod_descripcion: '' };
    this.imagenSeleccionada = null;
    this.editando = false;
  }
}

