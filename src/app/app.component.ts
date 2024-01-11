import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PersonajesService } from './services/personajes.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  arrPersonajes: any[] = [];

  currentPage: number = 1;

  numPages: number = 1;

  constructor(private personajesService: PersonajesService) {}
  ngOnInit() {
    this.personajesService.getAll()
    .then((response) => {
      this.arrPersonajes = response['results'];
      this.numPages = response['info']['pages'];
    });
  }
  async changePage(siguiente:boolean) {
    if(siguiente){this.currentPage++;}
    else{
      if(this.currentPage > 1){this.currentPage--;}
      else{this.currentPage = 1;}
    }
    const response = await this.personajesService.getAll(this.currentPage);
    this.arrPersonajes = response['results'];
  }

}
