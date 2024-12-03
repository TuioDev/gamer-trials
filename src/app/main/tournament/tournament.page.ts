import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GameListComponent } from 'src/app/components/game-list/game-list.component';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.page.html',
  styleUrls: ['./tournament.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, GameListComponent]
})
export class TournamentPage {
  tournamentName: string = 'Championship 2024';
  games = [
    { id: 1, name: 'Game One', image: 'assets/images/game1.jpg' },
    { id: 2, name: 'Game Two', image: 'assets/images/game2.jpg' },
    { id: 3, name: 'Game Three', image: 'assets/images/game3.jpg' },
    { id: 4, name: 'Game Four', image: 'assets/images/game1.jpg' },
    { id: 5, name: 'Game Five', image: 'assets/images/game2.jpg' },
    { id: 6, name: 'Game Six', image: 'assets/images/game3.jpg' },
  ];
}
