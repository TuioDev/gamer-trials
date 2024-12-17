import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonButton, IonInput, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButtons, CommonModule, FormsModule]
})
export class SignupPage {
  email: string = '';
  password: string = '';
  nickname: string = '';
  showPassword: boolean = false;
  signupSuccess: boolean = false;

  private apiService = inject(ApiService);
  private router = inject(Router);
  private authService = inject(AuthService);

  onConfirm() {
    if (this.email && this.password && this.nickname) {
      this.apiService.signup(this.email, this.password, this.nickname).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          this.signupSuccess = true;
        },
        error: (error) => {
          console.error('Signup failed:', error);
          alert('Signup failed. Please try again.');
        },
      });
    } else {
      alert('Please fill in all fields.');
    }
  }

  goToDashboard() {
    this.apiService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.setTokens(response.access, response.refresh);
        this.router.navigate(['/main/dashboard']);
      },
      error: (error) => {
        console.error('Auto-login failed:', error);
        this.router.navigate(['/login']);
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
