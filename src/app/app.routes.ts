import { Routes } from '@angular/router';
import { InjectionToken } from "@angular/core";
import { TabsPage } from "./components/tabs/tabs.page";
import { ContentComponent } from "./components/content-details/content-details.component";

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
        path: 'sign-up',
        loadComponent: () => import('./components/sign-up/sign-up.page').then(m => m.SignUpPage)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./components/favorites/favorites.page').then(m => m.FavoritesPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./components/profile/profile.page').then( m => m.ProfilePage)
      },
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
  },


/*
  {
    path: 'favorites',
    loadComponent: () => import('./components/favorites/favorites.page').then( m => m.FavoritesPage)
  }
*/

];
