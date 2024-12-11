import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

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
  studio: string;
  name: string;
  logo_url: string;
  game_url: string;
  description?: string;
}

export interface Competition {
  id: number;
  name: string;
  logo_url: string;
  start_date: string;
  end_date: string;
  games: Game[];
  status: boolean;
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
    return this.http.get<Competition[]>(url, { headers: this.getAuthHeaders() });
  }
}
