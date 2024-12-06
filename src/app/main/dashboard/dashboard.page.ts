import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { LeaderboardComponent } from 'src/app/components/leaderboard/leaderboard.component';
import { GameListComponent } from 'src/app/components/game-list/game-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    LeaderboardComponent,
    GameListComponent
  ]
})
export class DashboardPage {
  isDesktop: boolean = window.innerWidth > 768;
  tournamentName: string = 'Championship 2024';
  games = [
    {
      id: 1,
      name: 'Game One',
      title: 'Game One',
      studio: 'Studio A',
      image: 'assets/images/game1.jpg'
    },
    // ... rest of your games array
  ];

  @HostListener('window:resize')
  onResize() {
    this.isDesktop = window.innerWidth > 768;
  }
  game = {
    image: 'assets/images/game1.jpg',
    title: 'Elden Ring',
    studio: 'FromSoftware'
  }
  leaderboard = [
    { position: 1, nickname: 'Player 1', score: 1000 },
    { position: 2, nickname: 'Player 2', score: 900 },
    { position: 3, nickname: 'Player 3', score: 800 },
    { position: 4, nickname: 'Player 4', score: 700 },
    { position: 5, nickname: 'Player 5', score: 600 },
    { position: 6, nickname: 'Player 6', score: 500 },
    { position: 7, nickname: 'Player 7', score: 400 },
    { position: 8, nickname: 'Player 8', score: 300 },
    { position: 9, nickname: 'Player 9', score: 200 },
    { position: 10, nickname: 'Player 10', score: 100 }
  ]
  // ... rest of your component code
}
