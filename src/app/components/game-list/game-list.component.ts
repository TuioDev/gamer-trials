import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton
  ]
})
export class GameListComponent {
  @Input() games: any[] = [];
  @Input() layout: 'grid' | 'horizontal' = 'horizontal';

  playGame(gameId: number) {
    console.log(`Playing game with ID: ${gameId}`);
  }
}
