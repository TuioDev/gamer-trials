import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonButton, IonInput } from '@ionic/angular/standalone';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  nickname: string = '';

  private http = inject(HttpClient);

  private apiUrl = 'https://trials.monticellos.org/api/signup/';

  onConfirm() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Nickname:', this.nickname);

    // Lógica para integração com a API
    if (this.email && this.password && this.nickname) {
      // Dados para enviar à API
      const body = {
        email: this.email,
        password: this.password,
        nickname: this.nickname
      };

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      // Chamando a API usando HttpClient
      this.http.post(this.apiUrl, body, { headers }).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          alert('User created successfully!');
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
}
