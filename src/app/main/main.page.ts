import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonList, IonItem, IonText, IonListHeader, IonRange, IonToggle, IonButtons, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    IonToggle, IonRange, IonListHeader, IonText, IonItem, IonList,
    IonLabel, IonIcon, IonTabButton, IonTabBar, IonTabs, IonContent,
    IonHeader, IonTitle, IonToolbar, IonButtons, IonButton,
    CommonModule, FormsModule
  ]
})
export class MainPage {
  private router = inject(Router);
  private authService = inject(AuthService);

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
