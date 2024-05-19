import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {RouterLink} from "@angular/router";
import {SeriesService} from "../../services/series.service";
import {Content} from "../../interfaces/content";
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

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonTitle, IonRow, IonItem]
})
export class FavoritesPage{
  favoritesList: Favorite[] = [];
  contentList: Content[] = []


  constructor( private favoritesService: FavoriteService, private seriesService: SeriesService) { }

  ionViewWillEnter(){
    this.loadContent();
  }
  loadContent(){
    this.favoritesList = this.favoritesService.getFavorites();
    this.contentList = [];
    for(let favorite of this.favoritesList){
      this.seriesService.getContentById(favorite.contentId).subscribe((content )=> {this.contentList.push(content)});
    }
  }
  deleteFavorite(id: string){
    this.favoritesService.removeFavorite(id);
    this.loadContent();
  }

}
