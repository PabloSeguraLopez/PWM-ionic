import { Routes } from '@angular/router';
import { ContentComponent } from "./components/content-details/content-details.component";
import { InjectionToken } from "@angular/core";

export const SERIES_SERVICE = new InjectionToken<string>('SeriesService');

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
    path: 'series/:id',
    component: ContentComponent,
    data: { requiredService: SERIES_SERVICE }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
