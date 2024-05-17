import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import {TabsPage} from "../tabs/tabs.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [RouterLink, IonHeader, IonToolbar, IonButton, IonTitle, IonContent, TabsPage],
})
export class HomePage {
  constructor() {
  }
}
