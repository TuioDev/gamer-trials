import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-set-nickname',
  templateUrl: './set-nickname.page.html',
  styleUrls: ['./set-nickname.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SetNicknamePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
