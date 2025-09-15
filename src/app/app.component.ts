import { Component,OnInit} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { ApiService } from './services/api.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, FooterComponent, RouterOutlet, NavegacionComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'masertec';
  serverMessage = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getServerStatus().subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
        this.serverMessage = response;
      },
      error => {
        console.error('Error obteniendo el estado del servidor:', error);
      }
    );
  }
  
}
