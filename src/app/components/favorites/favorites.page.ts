import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {SeriesService} from "../../services/series.service";
import {ReviewService} from "../../services/review.service";
import {UserService} from "../../services/user.service";
import {Review} from "../../interfaces/review";
import {ContentService} from "../../services/content.service";
import {Content} from "../../interfaces/content";
import {IonicModule} from "@ionic/angular";
import {Favorite} from "../../interfaces/favorite";
import {FavoriteService} from "../../services/favorite.service";


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule, RouterLink, HttpClientModule]
})
export class FavoritesPage implements OnInit {
  favoritesList: Favorite[] = [];


  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private serieService: SeriesService, private reviewService: ReviewService, private userService: UserService, private favoritesService: FavoriteService) { }

  ngOnInit() {
    this.favoritesList = this.favoritesService.getFavorites();
  }


}
