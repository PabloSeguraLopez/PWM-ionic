import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  baseUrl: string = 'assets/icons/'
  constructor() { }
  getPlatformUrl(platform: string): string {
    switch (platform) {
      case 'Netflix':
        return 'https://www.netflix.com/';
      // Add more cases for other platforms
      case 'Crunchyroll':
        return 'https://www.crunchyroll.com/';
      default:
        return '#';
    }
  }

  getPlatformIconUrl(platform: string): string {
    switch (platform) {
      case 'Netflix':
        return this.baseUrl + 'netflix.svg';
      // Add more cases for other platforms
      case 'Crunchyroll':
        return this.baseUrl + 'crunchyroll.svg';
      default:
        return '';
    }
  }
}
