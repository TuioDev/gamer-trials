import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then(m => m.SignupPage)
  },
  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then(m => m.MainPage),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./main/dashboard/dashboard.page').then(m => m.DashboardPage),
        canActivate: [authGuard]
      },
      {
        path: 'tournament',
        loadComponent: () => import('./main/tournament/tournament.page').then(m => m.TournamentPage),
        canActivate: [authGuard]
      },
      {
        path: 'leaderboards',
        loadComponent: () => import('./main/leaderboards/leaderboards.page').then(m => m.LeaderboardsPage),
        canActivate: [authGuard]
      },
    ],
  },
];
