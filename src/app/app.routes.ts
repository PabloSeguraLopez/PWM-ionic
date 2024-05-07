import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.page').then((m) => m.LoginPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'header',
    loadComponent: () => import('./components/header/header.page').then( m => m.HeaderPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/sign-up/sign-up.page').then( m => m.SignUpPage)
  },

];
