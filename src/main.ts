import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth())
    ]),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"mistops-c0bce","appId":"1:794098111547:web:f42a73c9bf460a264e781e","databaseURL":"https://mistops-c0bce-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"mistops-c0bce.appspot.com","apiKey":"AIzaSyADtDo9LnPcWDsHYm-kDbGm0R_q4Nc70Tc","authDomain":"mistops-c0bce.firebaseapp.com","messagingSenderId":"794098111547","measurementId":"G-FVWBHQG99P"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
});
