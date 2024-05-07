import {Component} from '@angular/core';
import {environment} from "../assets/environment";
import {getAnalytics} from "@angular/fire/analytics";
import {initializeApp} from "@angular/fire/app";
import {IonicModule} from "@ionic/angular";

// Initialize Firebase
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MisTops';
}
