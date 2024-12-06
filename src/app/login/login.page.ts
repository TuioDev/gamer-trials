import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonButton, IonInput, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, CommonModule, FormsModule]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  private router = inject(Router);
  private apiService = inject(ApiService);
  private authService = inject(AuthService);

  constructor() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/main']);
    }
  }

  onLogin() {
    if (this.email && this.password) {
      this.apiService.login(this.email, this.password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('access_token', response.access);
          localStorage.setItem('refresh_token', response.refresh);
          this.router.navigate(['/main']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials and try again.');
        }
      });
    } else {
      alert('Please fill in all fields.');
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
