import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Content} from "../../interfaces/content";
import {SeriesService} from "../../services/series.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {UserService} from "../../services/user.service";
import {
  IonButton, IonCard,
  IonCardContent, IonCardHeader,
  IonCardTitle, IonCol,
  IonContent, IonGrid,
  IonHeader, IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [RouterLink, IonHeader, IonToolbar, IonButton, IonTitle, IonContent, NgForOf,
    NgIf,
    NgOptimizedImage, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCol, IonRow, IonGrid],
})
export class HomeComponent implements OnInit{
  topSeries: Content[] = [];
  isLoggedIn?: boolean;


  constructor(private serieService: SeriesService, private userService: UserService) {
  }

  ngOnInit() {
    this.serieService.getContents().subscribe(series => this.topSeries = series);
    this.isLoggedIn = this.userService.isLogged;
  }
}
