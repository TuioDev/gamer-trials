import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { TournamentCardComponent } from '../tournament-card/tournament-card.component';

@Component({
  selector: 'app-competitions-list',
  templateUrl: './competitions-list.component.html',
  styleUrls: ['./competitions-list.component.scss'],
  standalone: true,
  imports: [CommonModule, TournamentCardComponent]
})
export class CompetitionsListComponent implements OnInit {
  competitions: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCompetitions();
  }

  private loadCompetitions() {
    this.apiService.getActiveCompetitions().subscribe({
      next: (competitions) => {
        this.competitions = competitions;
      },
      error: (error) => {
        console.error('Error loading competitions:', error);
      }
    });
  }
}
