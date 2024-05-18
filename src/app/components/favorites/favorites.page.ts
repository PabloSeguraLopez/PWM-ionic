import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {SeriesService} from "../../services/series.service";
import {ReviewService} from "../../services/review.service";
import {UserService} from "../../services/user.service";
import {Review} from "../../interfaces/review";
import {ContentService} from "../../services/content.service";
import {Content} from "../../interfaces/content";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonicModule, RouterLink]
})
export class FavoritesPage implements OnInit {
  topEntries: Review[] = [];
  content: Content[] = [];
  topName: string = "TopNotFound";
  typeName: string = "TopNotFound";


  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private serieService: SeriesService, private reviewService: ReviewService, private userService: UserService) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.topName = String(routeParams.get('topName'));
    this.getTop(this.topName);
  }

  getTop(topName: string) {
    let service:ContentService;
    service = this.serieService;
    this.typeName = "series"
    this.getContents(service, topName);
  }

  private async getYourTop() {
    let user = await this.userService.getCurrentUser()
    if (user){
      const querySnapshot = await this.userService.getUserReviews(user.id)
      this.topEntries = querySnapshot.docs.map(doc => doc.data()) as Review[];
      this.topEntries = this.topEntries.filter(review => {
        return this.content.some(content => content.id === review.contentId);
      });
      this.topEntries.sort((a, b) => b.rating - a.rating);
    }
  }
  private getContents(service: ContentService, topName:string) {
    service.getContents()
      .subscribe(
        (data: Content[]) => {
          this.content = data;
          this.getYourTop();
        },
        (error) => {
          console.error('Error al cargar los datos:', error);
        }
      );
  }

  getContentById(id:string){
    return this.content.find(c => c.id === id)
  }

}
