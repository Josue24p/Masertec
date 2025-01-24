import { Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  formularioContacto : FormGroup
  
  constructor(private form: FormBuilder) {
    this.formularioContacto = this.form.group({
      nombre: ['', Validators.required],
      celular: ['', Validators.required],
      tipoEmail:['',[Validators.required, Validators.email]],
      tamanio:['',[Validators.required, Validators.email]]
    }); 
  }
  hasErrors(controlName: string, errorType: string){
    return this.formularioContacto.get(controlName)?.hasError(errorType)&&
    this.formularioContacto.get(controlName)?.touched
   }
}

