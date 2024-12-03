import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LeaderboardComponent } from 'src/app/components/leaderboard/leaderboard.component';

@Component({
  selector: 'app-leaderboards',
  standalone: true,
  imports: [CommonModule, IonicModule, LeaderboardComponent],
  templateUrl: './leaderboards.page.html',
  styleUrls: ['./leaderboards.page.scss'],
})
export class LeaderboardsPage {
  game = {
    image: 'https://via.placeholder.com/150',
    title: 'Super Game',
    studio: 'Game Studio',
  };

  leaderboard = [
    { position: 1, nickname: 'PlayerOne', score: 1500 },
    { position: 2, nickname: 'PlayerTwo', score: 1400 },
    { position: 3, nickname: 'PlayerThree', score: 1300 },
    { position: 4, nickname: 'PlayerFour', score: 1200 },
  ];
}
