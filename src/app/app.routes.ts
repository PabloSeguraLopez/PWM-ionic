import { Routes } from '@angular/router';
import { ContentComponent } from "./components/content-details/content-details.component";
import { InjectionToken } from "@angular/core";

export const SERIES_SERVICE = new InjectionToken<string>('SeriesService');

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.page').then((m) => m.HomeComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'series/:id',
    loadComponent: () => import('./components/content-details/content-details.component').then((m) => m.ContentComponent),
    data: { requiredService: SERIES_SERVICE }
  },
  {
    path: 'header',
    loadComponent: () => import('./components/header/header.page').then( m => m.HeaderPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.page').then( m => m.LoginPage)
  },
];
