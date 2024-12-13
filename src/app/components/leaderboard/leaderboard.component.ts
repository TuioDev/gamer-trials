import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ScoreResponse, GameStudio } from 'src/app/services/api.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent {
  @Input() game: {
    image: string;
    title: string;
    studio: GameStudio | null;
  } = {
    image: '',
    title: '',
    studio: null
  };

  @Input() leaderboard: ScoreResponse[] = [];

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
}
