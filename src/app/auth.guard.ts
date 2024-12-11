import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service';

export const authGuard = (p0: unknown) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirect to the login page
  router.navigate(['/login']);
  return false;
};
