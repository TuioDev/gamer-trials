import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent {
  @Input() game: { image: string; title: string; studio: string } = {
    image: '',
    title: '',
    studio: '',
  };

  @Input() leaderboard: { position: number; nickname: string; score: number }[] =
    [];

  getPositionClass(position: number): string {
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
