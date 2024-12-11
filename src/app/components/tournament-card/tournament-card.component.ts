import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { GameListComponent } from '../game-list/game-list.component';

interface Competition {
  id: number;
  name: string;
  logo_url: string;
  start_date: string;
  end_date: string;
  games: any[];
  status: boolean;
}

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    GameListComponent
  ]
})
export class TournamentCardComponent implements OnInit {
  @Input() competition!: Competition;

  ngOnInit() {
    console.log('Tournament Card - Competition:', this.competition);
    console.log('Tournament Card - Games:', this.competition.games);
  }
}
