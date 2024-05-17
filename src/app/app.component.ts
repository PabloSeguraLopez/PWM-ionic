import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { FavoriteService } from "./services/favorite.service";
import { SplashScreen } from '@capacitor/splash-screen';
import { HeaderPage } from "./components/header/header.page";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, HeaderPage],
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
