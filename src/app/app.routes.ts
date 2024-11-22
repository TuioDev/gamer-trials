import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'main/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'set-nickname',
    loadComponent: () => import('./set-nickname/set-nickname.page').then( m => m.SetNicknamePage)
  },
  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then(m => m.MainPage),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./main/dashboard/dashboard.page').then(m => m.DashboardPage) },
      { path: 'tournament', loadComponent: () => import('./main/tournament/tournament.page').then(m => m.TournamentPage) },
      { path: 'leaderboards', loadComponent: () => import('./main/leaderboards/leaderboards.page').then(m => m.LeaderboardsPage) },
    ],
  },
];
