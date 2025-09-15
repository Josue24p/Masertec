import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service'; // Importa el servicio
import { Router } from '@angular/router'; // Para redirigir después del envío

@Component({
    selector: 'app-contacto',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './contacto.component.html',
    styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit {
  formularioContacto!: FormGroup; // Definir sin inicializar, se asigna en ngOnInit

  constructor(
    private form: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularioContacto = this.form.group({
      nombre: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern('^9[0-9]{8}$')]],
      tipoEmail: ['', [Validators.required, Validators.email]],
      tamanio: ['', Validators.required]
    });
    console.log("📌 Formulario inicializado:", this.formularioContacto.value);
  }

  hasErrors(controlName: string, errorType: string) {
    return (
      this.formularioContacto.get(controlName)?.hasError(errorType) &&
      this.formularioContacto.get(controlName)?.touched
    );
  }

  onSubmit() {
    if (this.formularioContacto.valid) {
      const contactData = {
        nombre_contacto: this.formularioContacto.value.nombre,
        telefono_contacto: this.formularioContacto.value.celular,
        correo_contacto: this.formularioContacto.value.tipoEmail,
        mensaje_contacto: this.formularioContacto.value.tamanio // Asegúrate de que este campo sea el mensaje
      };
  
      console.log("📤 Enviando datos al backend:", contactData); // Debug en consola
  
      this.apiService.enviarContacto(contactData).subscribe(
        (response) => {
          console.log('✅ Mensaje enviado con éxito:', response);
          this.router.navigate(['/contacto']);
        },
        (error) => {
          console.error('❌ Error al enviar mensaje:', error);
        }
      );
    } else {
      console.log('⚠️ Formulario no válido');
    }
  }
}
