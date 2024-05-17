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
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'series/:id',
    loadComponent: () => import('./components/content-details/content-details.component').then((m) => m.ContentComponent),
    data: { requiredService: SERIES_SERVICE }
  },
];
