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

  getActiveCompetitions(): Observable<any[]> {
    const url = `${this.baseUrl}/competitions/`;
    return this.http.get<any[]>(url, { headers: this.getAuthHeaders() });
  }

  getCompetitionByName(name: string): Observable<any> {
    const url = `${this.baseUrl}/competitions/${name}`;
    return this.http.get<any>(url, { headers: this.getAuthHeaders() });
  }
}
