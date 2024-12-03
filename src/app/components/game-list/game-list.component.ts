import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class GameListComponent {
  @Input() games: any[] = []; // Lista de jogos
  @Input() layout: 'horizontal' | 'grid' = 'horizontal'; // Tipo de layout
}
