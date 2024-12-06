import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonText } from '@ionic/angular/standalone';
import { GameListComponent } from 'src/app/components/game-list/game-list.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.page.html',
  styleUrls: ['./tournament.page.scss'],
  standalone: true,
  imports: [IonText, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, GameListComponent]
})
export class TournamentPage implements OnInit{
  tournaments: any[] = [];
  activeTournaments: any[] = [];

  private apiService = inject(ApiService);

  ngOnInit() {
    this.loadActiveTournaments();
  }

  loadTournaments() {
    this.apiService.getActiveCompetitions().subscribe({
      next: (data) => {
        this.tournaments = data;
        console.log('Tournaments:', this.tournaments);
      },
      error: (error) => {
        console.error('Error fetching tournaments:', error);
      },
    });
  }

  loadActiveTournaments() {
    this.apiService.getActiveCompetitions().subscribe({
      next: (data) => {
        this.activeTournaments = data;
        console.log('Active Tournaments:', this.activeTournaments);
      },
      error: (error) => {
        console.error('Error fetching active tournaments:', error);
      },
    });
  }
}
