import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { FavoriteService } from "./services/favorite.service";
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private database: FavoriteService) {
    this.initApp();
  }

  private async initApp() {
    await SplashScreen.show({ showDuration: 1500})
    await this.database.initializeDb();
    SplashScreen.hide();
  }
}
