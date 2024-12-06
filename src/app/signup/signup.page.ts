import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonButton, IonInput, IonIcon } from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, CommonModule, FormsModule]
})
export class SignupPage {
  email: string = '';
  password: string = '';
  nickname: string = '';
  showPassword: boolean = false;
  signupSuccess: boolean = false;

  private apiService = inject(ApiService);
  private router = inject(Router);

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

  goToLogin() {
    this.router.navigate(['/login']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
