import { Routes } from '@angular/router';
import { ContentComponent } from "./components/content-details/content-details.component";
import { InjectionToken } from "@angular/core";
import { TabsPage } from "./components/tabs/tabs.page";

export const SERIES_SERVICE = new InjectionToken<string>('SeriesService');

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./components/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'login',
        loadComponent: () => import('./components/login/login.page').then(m => m.LoginPage)
      },
      {
        path: 'favorites',
        // loadComponent: () => import('./components/favorites/favorites.page').then(m => m.FavoritesPage)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'series/:id',
    component: ContentComponent,
    data: {
      requiredService: SERIES_SERVICE
    }
  }
];
