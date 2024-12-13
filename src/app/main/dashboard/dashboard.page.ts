import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonText, IonButton } from '@ionic/angular/standalone';
import { LeaderboardComponent } from 'src/app/components/leaderboard/leaderboard.component';
import { GameListComponent } from 'src/app/components/game-list/game-list.component';
import { ApiService, ScoreResponse, GameStudio, Competition } from 'src/app/services/api.service';
import { TournamentCardComponent } from 'src/app/components/tournament-card/tournament-card.component';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonButton, IonText,
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    LeaderboardComponent,
    GameListComponent,
    TournamentCardComponent
  ]
})
export class DashboardPage implements OnInit {
  isDesktop: boolean;

  activeTournament: Competition | null = null;
  leaderboard: ScoreResponse[] = [];
  game = {
    image: '',
    title: '',
    studio: null as GameStudio | null
  };

  constructor(
    private platform: Platform,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.isDesktop = this.platform.is('desktop');
  }

  ngOnInit() {
    this.loadActiveTournament();
  }

  private loadActiveTournament() {
    this.apiService.getActiveCompetitions().subscribe({
      next: (competitions) => {
        const now = new Date();
        this.activeTournament = competitions.find(comp => {
          const startDate = new Date(comp.start_date);
          const endDate = new Date(comp.end_date);
          return comp.is_active && now >= startDate && now <= endDate;
        }) || null;

        if (this.activeTournament) {
          this.loadMostPopularGameLeaderboard();
        }
      },
      error: (error) => {
        console.error('Error loading active tournament:', error);
      }
    });
  }

  private loadMostPopularGameLeaderboard() {
    if (!this.activeTournament || !this.activeTournament.games.length) return;

    const selectedGame = this.activeTournament.games[0];
    console.log('Selected game:', selectedGame);

    this.game = {
      image: selectedGame.logo_url,
      title: selectedGame.name,
      studio: selectedGame.studio
    };

    this.apiService.getLeaderboard(this.activeTournament.id, selectedGame.id)
      .subscribe({
        next: (scores) => {
          console.log('Processed leaderboard:', scores);
          this.leaderboard = scores.slice(0, 4);
        },
        error: (error) => {
          console.error('Error loading leaderboard:', error);
        }
      });
  }

  registerRandomScore() {
    if (!this.activeTournament || !this.activeTournament.games.length) return;

    const selectedGame = this.activeTournament.games[0];
    const randomScore = Math.floor(Math.random() * 1000) + 1;
    const userId = this.authService.getUserId();

    this.apiService.registerScore(
      userId,
      selectedGame.id,
      this.activeTournament.id,
      randomScore
    ).subscribe({
      next: (response) => {
        console.log('Score registered:', response);
        this.loadMostPopularGameLeaderboard();
      },
      error: (error) => {
        console.error('Error registering score:', error);
      }
    });
  }
}
