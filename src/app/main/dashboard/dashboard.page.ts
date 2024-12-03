import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonicSlides, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/angular/standalone';
import { LeaderboardComponent } from 'src/app/components/leaderboard/leaderboard.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, LeaderboardComponent],
  schemas: [NO_ERRORS_SCHEMA],
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
    direction: 'horizontal',
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true,
    freeMode: true,
    // pagination: {
    //   clickable: true,
    // },
  };

  playGame(gameId: number) {
    console.log(`Playing game with ID: ${gameId}`);
    // Implementar lógica para iniciar o jogo
  }

  game = {
    image: 'assets/images/game1.jpg',
    title: 'Elden Ring',
    studio: 'FROMSOFTWARE',
  };

  leaderboard = [
    { position: 1, nickname: 'Player 1', score: 2000 },
    { position: 2, nickname: 'Player 2', score: 1800 },
    { position: 3, nickname: 'Player 3', score: 1600 },
    { position: 4, nickname: 'Player 4', score: 1400 },
  ];
}
