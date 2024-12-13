import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonText } from '@ionic/angular/standalone';
import { ApiService, Competition } from 'src/app/services/api.service';
import { TournamentCardComponent } from 'src/app/components/tournament-card/tournament-card.component';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.page.html',
  styleUrls: ['./tournament.page.scss'],
  standalone: true,
  imports: [IonText, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TournamentCardComponent]
})
export class TournamentPage implements OnInit{
  tournaments: Competition[] = [];

  private apiService = inject(ApiService);

  ngOnInit() {
    this.loadTournaments();
  }

  loadTournaments() {
    this.apiService.getAllCompetitions().subscribe({
      next: (data) => {
        console.log('Raw competitions data:', data);
        this.tournaments = data.sort((a, b) => {
          if (a.is_active && !b.is_active) return -1;
          if (!a.is_active && b.is_active) return 1;
          return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
        });
        console.log('Sorted competitions:', this.tournaments);
      },
      error: (error) => {
        console.error('Error fetching tournaments:', error);
      },
    });
  }
}
