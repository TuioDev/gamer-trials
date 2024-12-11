import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonText } from '@ionic/angular/standalone';
import { LeaderboardComponent } from 'src/app/components/leaderboard/leaderboard.component';
import { GameListComponent } from 'src/app/components/game-list/game-list.component';
import { CompetitionsListComponent } from 'src/app/components/competitions-list/competitions-list.component';
import { ApiService } from 'src/app/services/api.service';
import { TournamentCardComponent } from 'src/app/components/tournament-card/tournament-card.component';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonText,
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    LeaderboardComponent,
    GameListComponent,
    CompetitionsListComponent,
    TournamentCardComponent
  ]
})
export class DashboardPage implements OnInit {
  isDesktop: boolean;
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

  activeTournament: any = null;

  constructor(
    private platform: Platform,
    private apiService: ApiService
  ) {
    this.isDesktop = this.platform.is('desktop');
  }

  ngOnInit() {
    this.loadActiveTournament();
  }

  private loadActiveTournament() {
    console.log("Is desktop: ", this.isDesktop);
    this.apiService.getActiveCompetitions().subscribe({
      next: (competitions) => {
        this.activeTournament = competitions.find(comp => {
          const now = new Date();
          const startDate = new Date(comp.start_date);
          const endDate = new Date(comp.end_date);
          return now >= startDate && now <= endDate;
        });
      },
      error: (error) => {
        console.error('Error loading active tournament:', error);
      }
    });
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
