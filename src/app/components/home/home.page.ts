import { Component } from '@angular/core';
import { } from '@ionic/angular';
import { RouterLink } from "@angular/router";
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [RouterLink, IonHeader, IonToolbar, IonButton, IonTitle, IonContent ],
})
export class HomePage {
  constructor() {
  }
}
