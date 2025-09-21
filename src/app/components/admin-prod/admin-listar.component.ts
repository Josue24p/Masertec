import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-listar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-listar.component.html',
  styleUrls: ['./admin-listar.component.css']
})
export class AdminListarComponent implements OnInit, AfterViewInit {
  // =============================
  // 📌 PRODUCTOS
  // =============================
  subcategorias: any[] = []; // <-- UNA sola declaración
  productos: any[] = [];
  editando: boolean = false;
  nuevoProducto = {
    id_producto: null,
    id_subcategoria: null,
    prod_nombre: '',
    prod_image: '',
    prod_descripcion: '',
    prod_precio: ''
  };
  imagenSeleccionada: File | null = null;

  // =============================
  // 📌 CATEGORÍAS
  // =============================
  categorias: any[] = [];
  nuevaCategoria: any = {
    cat_nombre: '',
    cat_descripcion: ''
  };
  editandoCategoria: boolean = false;
  categoriaSeleccionada: any = null;
  imagenCategoria: File | null = null;

  // =============================
  // 📌 SUBCATEGORÍAS
  // =============================
  nuevaSubcategoria: any = {
    id_categoria: null,
    subcat_nombre: '',
    subcat_descripcion: ''
  };
  editandoSubcategoria: boolean = false;
  subcategoriaSeleccionada: any = null;
  imagenSubcategoria: File | null = null;

  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    this.cargarSubcategorias();
    this.cargarProductos();
    this.cargarCategorias();
  }

  ngAfterViewInit(): void {
    const btnBuscar = document.getElementById('Buscar-btn');
    if (btnBuscar) {
      btnBuscar.addEventListener('click', () => this.buscarProducto());
    }
  }

  // =============================
  // 📌 PRODUCTOS
  // =============================
  cargarProductos(): void {
    this.ApiService.getProductos().subscribe(
      data => this.productos = data,
      error => console.error('Error al obtener productos', error)
    );
  }

  onFileSelected(event: any) {
    this.imagenSeleccionada = event.target.files[0];
  }

  registrarProducto(): void {
    if (this.editando) return;

    const formData = new FormData();
    formData.append('id_subcategoria', this.nuevoProducto.id_subcategoria!);
    formData.append('prod_nombre', this.nuevoProducto.prod_nombre);
    formData.append('prod_descripcion', this.nuevoProducto.prod_descripcion);
    formData.append('prod_precio', this.nuevoProducto.prod_precio);
    if (this.imagenSeleccionada) formData.append('prod_image', this.imagenSeleccionada);

    this.ApiService.crearProducto(formData).subscribe(
      () => {
        this.limpiarFormulario();
        Swal.fire('¡Éxito!', 'El producto ha sido registrado correctamente.', 'success')
          .then(() => this.cargarProductos());
      },
      () => Swal.fire('Error', 'Hubo un problema al registrar el producto.', 'error')
    );
  }

  editarProducto(producto: any): void {
    this.nuevoProducto = { ...producto };
    this.editando = true;
  }

  actualizarProducto(): void {
    if (!this.nuevoProducto.id_producto) return;

    const formData = new FormData();
    formData.append('id_subcategoria', this.nuevoProducto.id_subcategoria!);
    formData.append('prod_nombre', this.nuevoProducto.prod_nombre);
    formData.append('prod_descripcion', this.nuevoProducto.prod_descripcion);
    formData.append('prod_precio', this.nuevoProducto.prod_precio);
    if (this.imagenSeleccionada) formData.append('prod_image', this.imagenSeleccionada);

    this.ApiService.actualizarProducto(this.nuevoProducto.id_producto, formData).subscribe(
      () => {
        this.limpiarFormulario();
        Swal.fire('¡Actualizado!', 'El producto ha sido actualizado correctamente.', 'success')
          .then(() => this.cargarProductos());
      },
      () => Swal.fire('Error', 'No se pudo actualizar el producto.', 'error')
    );
  }

  cancelarEdicion(): void {
    this.limpiarFormulario();
  }

  limpiarFormulario(): void {
    this.nuevoProducto = { id_producto: null, id_subcategoria: null, prod_nombre: '', prod_image: '', prod_descripcion: '', prod_precio: '' };
    this.imagenSeleccionada = null;
    this.editando = false;
  }

  eliminarProducto(id_producto: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ApiService.eliminarProducto(id_producto).subscribe(
          () => {
            Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
            this.cargarProductos();
          },
          () => Swal.fire('Error', 'No se pudo eliminar el producto.', 'error')
        );
      }
    });
  }

  buscarProducto(): void {
    const input = document.getElementById('search') as HTMLInputElement;
    const id = input.value.trim();

    if (!id) {
      Swal.fire('Aviso', 'Ingrese un ID para buscar', 'warning');
      return;
    }

    this.ApiService.getProducto(+id).subscribe(
      producto => this.productos = [producto],
      () => Swal.fire('Error', 'Producto no encontrado', 'error')
    );
  }

  // =============================
  // 📌 CATEGORÍAS
  // =============================
  cargarCategorias(): void {
    this.ApiService.getCategorias().subscribe(
      data => this.categorias = data,
      error => console.error('Error al obtener categorías', error)
    );
  }

  registrarCategoria(): void {
    if (this.editandoCategoria) return;

    const formData = new FormData();
    formData.append('cat_nombre', this.nuevaCategoria.cat_nombre);
    formData.append('cat_descripcion', this.nuevaCategoria.cat_descripcion);

    if (this.imagenCategoria) {
      formData.append('cat_imagen', this.imagenCategoria);
    }

    this.ApiService.crearCategoria(formData).subscribe(
      () => {
        Swal.fire('Éxito', 'Categoría registrada con éxito', 'success');
        this.cargarCategorias();
        this.limpiarCategoria();
      },
      (error) => {
        console.error("Error al registrar categoría:", error);
        Swal.fire('Error', 'No se pudo registrar la categoría', 'error');
      }
    );
  }

  editarCategoria(categoria: any): void {
    this.categoriaSeleccionada = { ...categoria };
    this.nuevaCategoria = { cat_nombre: categoria.cat_nombre, cat_descripcion: categoria.cat_descripcion };
    this.editandoCategoria = true;
  }

  actualizarCategoria(): void {
    if (!this.categoriaSeleccionada) return;

    const formData = new FormData();
    formData.append('cat_nombre', this.nuevaCategoria.cat_nombre);
    formData.append('cat_descripcion', this.nuevaCategoria.cat_descripcion);

    if (this.imagenCategoria) {
      formData.append('cat_imagen', this.imagenCategoria);
    }

    this.ApiService.actualizarCategoria(this.categoriaSeleccionada.id_categoria, formData).subscribe(
      () => {
        Swal.fire('¡Actualizado!', 'Categoría actualizada con éxito', 'success')
          .then(() => this.cargarCategorias());
        this.limpiarCategoria();
      },
      (error) => {
        console.error("Error al actualizar categoría:", error);
        Swal.fire('Error', 'No se pudo actualizar la categoría', 'error');
      }
    );
  }

  eliminarCategoria(id: number): void {
    Swal.fire({
      title: '¿Eliminar categoría?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.ApiService.eliminarCategoria(id).subscribe(
          () => {
            Swal.fire('¡Eliminado!', 'La categoría ha sido eliminada.', 'success');
            this.cargarCategorias();
          },
          () => Swal.fire('Error', 'No se pudo eliminar la categoría', 'error')
        );
      }
    });
  }

  onFileSelectedCategoria(event: any) {
    this.imagenCategoria = event.target.files[0];
    console.log("Archivo seleccionado:", this.imagenCategoria);
  }

  limpiarCategoria(): void {
    this.nuevaCategoria = { cat_nombre: '', cat_descripcion: '' };
    this.imagenCategoria = null;
    this.editandoCategoria = false;
    this.categoriaSeleccionada = null;
  }

  // =============================
  // 📌 SUBCATEGORÍAS
  // =============================
  cargarSubcategorias(): void {
    // Primero asegurarse de que categorías estén cargadas
    if (!this.categorias || this.categorias.length === 0) {
      this.ApiService.getCategorias().subscribe(
        data => {
          this.categorias = data;
          this.cargarSubcategorias(); // vuelve a llamar ahora que categorías están listas
        },
        error => console.error('Error al obtener categorías', error)
      );
      return;
    }

    this.ApiService.getSubcategorias().subscribe(
      data => {
        this.subcategorias = data.map(sub => ({
          ...sub,
          cat_nombre: this.categorias.find(cat => cat.id_categoria === sub.id_categoria)?.cat_nombre || 'Sin categoría'
        }));
      },
      error => console.error('Error al obtener subcategorías', error)
    );
  }

  registrarSubcategoria(): void {
    if (this.editandoSubcategoria) return;

    const formData = new FormData();
    formData.append('id_categoria', this.nuevaSubcategoria.id_categoria);
    formData.append('subcat_nombre', this.nuevaSubcategoria.subcat_nombre);
    formData.append('subcat_descripcion', this.nuevaSubcategoria.subcat_descripcion);
    if (this.imagenSubcategoria) {
      formData.append('subcat_imagen', this.imagenSubcategoria);
    }

    this.ApiService.crearSubcategoria(formData).subscribe(
      () => {
        Swal.fire('Éxito', 'Subcategoría registrada con éxito', 'success');
        this.cargarSubcategorias();
        this.limpiarSubcategoria();
      },
      (error) => {
        console.error("Error al registrar subcategoría:", error);
        Swal.fire('Error', 'No se pudo registrar la subcategoría', 'error');
      }
    );
  }

  editarSubcategoria(subcategoria: any): void {
    this.subcategoriaSeleccionada = { ...subcategoria };
    this.nuevaSubcategoria = {
      id_categoria: subcategoria.id_categoria,
      subcat_nombre: subcategoria.subcat_nombre,
      subcat_descripcion: subcategoria.subcat_descripcion
    };
    this.editandoSubcategoria = true;
  }

  actualizarSubcategoria(): void {
    if (!this.subcategoriaSeleccionada) return;

    const formData = new FormData();
    formData.append('id_categoria', this.nuevaSubcategoria.id_categoria);
    formData.append('subcat_nombre', this.nuevaSubcategoria.subcat_nombre);
    formData.append('subcat_descripcion', this.nuevaSubcategoria.subcat_descripcion);
    if (this.imagenSubcategoria) {
      formData.append('subcat_imagen', this.imagenSubcategoria);
    }

    this.ApiService.actualizarSubcategoria(this.subcategoriaSeleccionada.id_subcategoria, formData).subscribe(
      () => {
        Swal.fire('¡Actualizado!', 'Subcategoría actualizada con éxito', 'success')
          .then(() => this.cargarSubcategorias());
        this.limpiarSubcategoria();
      },
      (error) => {
        console.error("Error al actualizar subcategoría:", error);
        Swal.fire('Error', 'No se pudo actualizar la subcategoría', 'error');
      }
    );
  }

  eliminarSubcategoria(id: number): void {
    Swal.fire({
      title: '¿Eliminar subcategoría?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.ApiService.eliminarSubcategoria(id).subscribe(
          () => {
            Swal.fire('¡Eliminada!', 'La subcategoría ha sido eliminada.', 'success');
            this.cargarSubcategorias();
          },
          () => Swal.fire('Error', 'No se pudo eliminar la subcategoría', 'error')
        );
      }
    });
  }

  buscarSubcategoria(id: number): void {
    this.ApiService.getSubcategoria(id).subscribe(
      subcategoria => this.subcategorias = [subcategoria],
      () => Swal.fire('Error', 'Subcategoría no encontrada', 'error')
    );
  }

  onFileSelectedSubcategoria(event: any) {
    this.imagenSubcategoria = event.target.files[0];
  }

  limpiarSubcategoria(): void {
    this.nuevaSubcategoria = { id_categoria: null, subcat_nombre: '', subcat_descripcion: '' };
    this.imagenSubcategoria = null;
    this.editandoSubcategoria = false;
    this.subcategoriaSeleccionada = null;
  }
}
