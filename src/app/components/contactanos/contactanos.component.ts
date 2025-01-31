import { Component,OnInit  } from '@angular/core';
import { ApiService } from '../../services/api.service'; // Subir un nivel y acceder al servicio
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [CommonModule,FilterPipe,FormsModule],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css'
})
export class ContactanosComponent implements OnInit{
  contactos: any[] = []; // Variable para almacenar los contactos
  filtro: string = '';
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.getContactos().subscribe(
      (response) => {
        this.contactos = response;
        console.log('Contactos obtenidos:', this.contactos); // Verifica que lleguen los datos
      },
      (error) => {
        console.error('Error al obtener contactos:', error);
      }
    );
  }
}
