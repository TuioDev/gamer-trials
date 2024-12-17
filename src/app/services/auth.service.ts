import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  // Get the access token from localStorage
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Get the refresh token from localStorage
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  // Log out the user by removing tokens from localStorage
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getUserId(): number {
    const token = this.getAccessToken();
    if (!token) return 0;

    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.user_id;
    } catch (e) {
      console.error('Error decoding token:', e);
      return 0;
    }
  }

  setTokens(access: string, refresh: string): void {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }
}
