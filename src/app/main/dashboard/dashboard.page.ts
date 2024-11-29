import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonicSlides, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardPage {
  swiperModules = [IonicSlides];
  tournamentName: string = 'Championship 2024';
  games = [
    { id: 1, name: 'Game One', image: 'assets/images/game1.jpg' },
    { id: 2, name: 'Game Two', image: 'assets/images/game2.jpg' },
    { id: 3, name: 'Game Three', image: 'assets/images/game3.jpg' },
    { id: 4, name: 'Game Four', image: 'assets/images/game1.jpg' },
    { id: 5, name: 'Game Five', image: 'assets/images/game2.jpg' },
    { id: 6, name: 'Game Six', image: 'assets/images/game3.jpg' },
  ];

  // Opções do Swiper
  slideOpts = {
    direction: 'horizontal', // Direção de deslizamento horizontal
    slidesPerView: 1.5, // Mostrar 1.2 slides
    spaceBetween: 20,   // Espaço entre slides
    centeredSlides: true, // Centralizar os slides no carrossel
    freeMode: true,     // Permitir deslizar livremente
    // pagination: {
    //   clickable: true, // Páginas clicáveis
    // },
  };

  playGame(gameId: number) {
    console.log(`Playing game with ID: ${gameId}`);
    // Implementar lógica para iniciar o jogo
  }
}
