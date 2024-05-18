import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {SeriesService} from "../../services/series.service";
import {ReviewService} from "../../services/review.service";
import {UserService} from "../../services/user.service";
import {Favorite} from "../../interfaces/favorite";
import {FavoriteService} from "../../services/favorite.service";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent, IonItem, IonRow,
  IonTitle
} from "@ionic/angular/standalone";
import {Content} from "../../interfaces/content";



@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonTitle, IonRow, IonItem]
})
export class FavoritesPage implements OnInit {
  favoritesList: Favorite[] = [];


  constructor(private http: HttpClient,
              private route: ActivatedRoute, private favoritesService: FavoriteService, private seriesService: SeriesService) { }

  ngOnInit() {

  }
  ionViewWillEnter(){
    this.favoritesList = this.favoritesService.getFavorites();
  }


}
