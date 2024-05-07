// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {importProvidersFrom} from "@angular/core";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyADtDo9LnPcWDsHYm-kDbGm0R_q4Nc70Tc",
    authDomain: "mistops-c0bce.firebaseapp.com",
    projectId: "mistops-c0bce",
    storageBucket: "mistops-c0bce.appspot.com",
    messagingSenderId: "794098111547",
    appId: "1:794098111547:web:f42a73c9bf460a264e781e",
    measurementId: "G-5MEF921126"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
