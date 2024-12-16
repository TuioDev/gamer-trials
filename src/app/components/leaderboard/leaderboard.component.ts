import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonText, IonButton, IonList, IonItem } from '@ionic/angular/standalone';
import { ApiService, ScoreResponse, GameStudio } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [IonItem, IonList, CommonModule, IonText, IonButton],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {
  @Input() game!: {
    image: string;
    title: string;
    studio: GameStudio | null;
  };
  @Input() leaderboard: ScoreResponse[] = [];
  @Input() competitionId?: number;
  @Input() gameId?: number;
  @Output() scoreRegistered = new EventEmitter<void>();

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  registerRandomScore() {
    if (!this.competitionId || !this.gameId) return;

    const randomScore = Math.floor(Math.random() * 1000) + 1;
    const userId = this.authService.getUserId();

    this.apiService.registerScore(
      userId,
      this.gameId,
      this.competitionId,
      randomScore
    ).subscribe({
      next: (response) => {
        console.log('Score registered:', response);
        this.scoreRegistered.emit();
      },
      error: (error) => {
        console.error('Error registering score:', error);
      }
    });
  }

  getPositionClass(position: number | undefined): string {
    if (!position) return 'blue';

    switch (position) {
      case 1:
        return 'gold';
      case 2:
        return 'silver';
      case 3:
        return 'bronze';
      default:
        return 'blue';
    }
  }

  refreshLeaderboard() {
    if (this.gameId !== undefined && this.competitionId !== undefined) {
      this.apiService.getLeaderboard(this.gameId, this.competitionId).subscribe({
        next: (data) => {
          this.leaderboard = data;
          this.scoreRegistered.emit();
        },
        error: (error) => {
          console.error('Error refreshing leaderboard:', error);
        }
      });
    } else {
      console.error('Game ID or Competition ID is undefined');
    }
  }
}
