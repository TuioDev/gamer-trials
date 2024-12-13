import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

interface LoginResponse {
  access: string;
  refresh: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

export interface Game {
  id: number;
  studio: GameStudio;
  name: string;
  logo_url: string;
  game_url: string;
  description?: string;
}

export interface GameStudio {
  id: number;
  studio_name: string;
  representative: string;
  user: number;
}

export interface Competition {
  id: number;
  name: string;
  logo_url: string;
  start_date: string;
  end_date: string;
  games: Game[];
  is_active: boolean;
}

export interface ScoreRegistration {
  user: number;
  game: number;
  competition: number;
  score: number;
}

export interface ScoreResponse {
  user: {
    id: number;
    nickname: string;
    email: string;
  };
  score: number;
  played_at: string;
  position: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://trials.monticellos.org/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const url = `${this.baseUrl}/token/`;
    const body: LoginRequest = {
      username: email,
      password: password
    };
    return this.http.post<LoginResponse>(url, body);
  }

  signup(email: string, password: string, nickname: string): Observable<any> {
    const url = `${this.baseUrl}/signup/`;
    const body = { email, password, nickname };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers });
  }

  getActiveCompetitions(): Observable<Competition[]> {
    const url = `${this.baseUrl}/competitions/`;
    return this.http.get<Competition[]>(url, { headers: this.getAuthHeaders() }).pipe(
      map(competitions => competitions.filter(comp => comp.is_active))
    );
  }

  getAllCompetitions(): Observable<Competition[]> {
    const url = `${this.baseUrl}/competitions/`;
    return this.http.get<Competition[]>(url, { headers: this.getAuthHeaders() });
  }

  registerScore(userId: number, gameId: number, competitionId: number, score: number): Observable<ScoreResponse> {
    const url = `${this.baseUrl}/register-score/`;
    const scoreData: ScoreRegistration = {
      user: userId,
      game: gameId,
      competition: competitionId,
      score: score
    };

    return this.http.post<ScoreResponse>(url, scoreData, {
      headers: this.getAuthHeaders()
    });
  }

  getLeaderboard(competitionId: number, gameId: number): Observable<ScoreResponse[]> {
    const url = `${this.baseUrl}/leaderboard/${competitionId}/${gameId}/`;
    return this.http.get<ScoreResponse[]>(url, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(scores => {
        console.log('Raw leaderboard response:', scores);
        return scores.map((score, index) => ({
          ...score,
          position: index + 1,
          nickname: score.user.nickname
        }));
      })
    );
  }
}
