import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton } from '@ionic/angular/standalone';
import { Game } from 'src/app/services/api.service';
import { PlatformStateService } from 'src/app/services/platform-state.service';
import { Observable, map } from 'rxjs';

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
  @Input() games: Game[] = [];
  @Input() layout?: 'grid' | 'horizontal';

  currentLayout$: Observable<'grid' | 'horizontal'>;

  constructor(private platformState: PlatformStateService) {
    this.currentLayout$ = this.platformState.isDesktop$.pipe(
      map(isDesktop => {
        const determinedLayout = this.layout || (isDesktop ? 'grid' : 'horizontal');
        return determinedLayout;
      })
    );
  }

  playGame(gameId: number) {
    const game = this.games.find(g => g.id === gameId);
    if (game && game.game_url) {
      // Open the game URL in a new tab
      window.open(game.game_url, '_blank');
    } else {
      console.error('Game URL not found for game ID:', gameId);
    }
  }
}
