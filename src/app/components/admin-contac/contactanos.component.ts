import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-contactanos',
  imports: [CommonModule, FilterPipe, FormsModule],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css'
})
export class ContactanosComponent implements OnInit {
  contactos: any[] = []; // contactos obtenidos del backend
  filtro: string = '';

  // Objeto mensaje (con correo en vez de id)
  mensaje = {
    correo: '',
    asunto: '',
    cuerpo: ''
  };

  enviando = false;
  enviado = false;
  errorMsg = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getContactos().subscribe(
      (response) => {
        this.contactos = response;
        console.log('📋 Contactos obtenidos:', this.contactos);
      },
      (error) => {
        console.error('❌ Error al obtener contactos:', error);
      }
    );
  }

  // 👉 Seleccionar contacto por correo
  seleccionarContacto(contacto: any) {
    this.mensaje.correo = contacto.correo_contacto; // guardamos el correo directamente
    this.enviado = false;
    this.errorMsg = '';
    console.log('📧 Destinatario seleccionado:', this.mensaje.correo);
  }

  // 👉 Enviar mensaje
  enviarMensaje() {
    if (!this.mensaje.correo || !this.mensaje.asunto || !this.mensaje.cuerpo) {
      this.errorMsg = 'Debes completar todos los campos.';
      return;
    }

    const payload = {
      to: this.mensaje.correo,  // enviamos correo directo al backend
      asunto: this.mensaje.asunto,
      mensaje: this.mensaje.cuerpo
    };

    this.enviando = true;
    this.apiService.enviarCorreoContacto(payload).subscribe(
      (response) => {
        console.log('✅ Mensaje enviado:', response);
        this.enviado = true;
        this.enviando = false;
        // reset del formulario
        this.mensaje = { correo: '', asunto: '', cuerpo: '' };
      },
      (error) => {
        console.error('❌ Error al enviar mensaje:', error);
        this.errorMsg = 'Error al enviar el mensaje.';
        this.enviando = false;
      }
    );
  }
}
