import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LeaderboardComponent } from 'src/app/components/leaderboard/leaderboard.component';
import { ApiService, Competition, Game, ScoreResponse } from 'src/app/services/api.service';

interface GameLeaderboard {
  game: {
    image: string;
    title: string;
    studio: any;
  };
  gameId: number;
  leaderboard: ScoreResponse[];
}

@Component({
  selector: 'app-leaderboards',
  standalone: true,
  imports: [CommonModule, IonicModule, LeaderboardComponent],
  templateUrl: './leaderboards.page.html',
  styleUrls: ['./leaderboards.page.scss'],
})
export class LeaderboardsPage implements OnInit {
  activeTournament: Competition | null = null;
  gameLeaderboards: GameLeaderboard[] = [];

  constructor(private apiService: ApiService) {}

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
          this.loadAllGameLeaderboards();
        }
      }
    });
  }

  private loadAllGameLeaderboards() {
    if (!this.activeTournament) return;

    this.gameLeaderboards = [];
    this.activeTournament.games.forEach(game => {
      const gameData = {
        game: {
          image: game.logo_url,
          title: game.name,
          studio: game.studio
        },
        gameId: game.id,
        leaderboard: []
      };

      this.gameLeaderboards.push(gameData);

      this.apiService.getLeaderboard(this.activeTournament!.id, game.id)
        .subscribe({
          next: (scores) => {
            const index = this.gameLeaderboards.findIndex(
              gb => gb.game.title === game.name
            );
            if (index !== -1) {
              this.gameLeaderboards[index].leaderboard = scores.slice(0, 10);
            }
          }
        });
    });
  }

  refreshLeaderboard(gameId: number) {
    if (!this.activeTournament) return;

    this.apiService.getLeaderboard(this.activeTournament.id, gameId)
      .subscribe({
        next: (scores) => {
          const index = this.gameLeaderboards.findIndex(
            gb => gb.gameId === gameId
          );
          if (index !== -1) {
            this.gameLeaderboards[index].leaderboard = scores.slice(0, 10);
          }
        }
      });
  }
}
