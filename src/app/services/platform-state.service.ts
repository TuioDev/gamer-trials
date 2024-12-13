import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformStateService {
  private isDesktopSubject = new BehaviorSubject<boolean>(false);
  isDesktop$ = this.isDesktopSubject.asObservable();

  constructor(private platform: Platform) {
    this.isDesktopSubject.next(this.platform.is('desktop'));

    // Optional: Listen for platform changes
    this.platform.resize.subscribe(() => {
      this.isDesktopSubject.next(this.platform.is('desktop'));
    });
  }
}
