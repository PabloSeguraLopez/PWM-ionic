import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { Content } from "../../interfaces/content";
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { PlatformService } from "../../services/platform.service";
import { ReviewComponent } from "./review/review.component";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ContentService } from "../../services/content.service";
import { AddContentComponent } from "../add-content/add-content.component";
import { UserService } from "../../services/user.service";
import { FavoriteService } from "../../services/favorite.service";
import { IonButton, IonContent, IonList, IonModal, ModalController, ToastController } from "@ionic/angular/standalone";
import { ReviewService } from "../../services/review.service";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReviewComponent,
    NgForOf,
    NgIf,
    RouterLink,
    AddContentComponent,
    IonButton,
    IonList,
    IonContent
  ],
  templateUrl: './content-details.component.html',
  styleUrl: './content-details.component.scss'
})
export class ContentComponent implements OnInit {
  @Input()
  protected contentId: string = "";
  protected contentService: ContentService | undefined;
  protected content?: Content;
  @ViewChild(IonModal) modal?: IonModal;
  isFavorite: boolean = false;
  protected userHasReview: boolean = false;

  constructor(private reviewService: ReviewService, private favoriteService: FavoriteService, private userService: UserService, private toastController: ToastController, private modalController: ModalController, private platformService: PlatformService, private injector: Injector, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.contentId = params['id'];
      }
    )
    const serviceToken = this.route.snapshot.data['requiredService'];
    this.contentService = this.injector.get<ContentService>(<any>serviceToken);

    this.contentService.getContentById(this.contentId).subscribe(
      content => this.content = content
    )
  }

  ionViewWillEnter() {
    this.favoriteService.isFavorite(this.contentId).then(
      isFavorite => this.isFavorite = isFavorite
    );
    this.userHasReviewed().then(
      hasReviewed => this.userHasReview = hasReviewed
    )
  }

  getPlatformUrl(platform: string): string {
    return this.platformService.getPlatformUrl(platform);
  }

  getPlatformIconClass(platform: string): string {
    return this.platformService.getPlatformIconUrl(platform);
  }

  async openAddContentModal() {
    if (!this.userService.isLogged) {
      this.toastController.create({
        message: 'Please login to add content',
        duration: 2000
      }).then(toast => toast.present());
      return;
    }
    await this.modalController.create({
      component: AddContentComponent,
      componentProps: {
        content: this.content,
        contentService: this.contentService
      }
    }).then(modal => modal.present());
  }

  addFavorite() {
    this.favoriteService.addFavorite({
      contentId: this.contentId,
      type: 'series'
    }).then(success => {
      if (!success) {
        console.error('Error adding to favorites')
        return;
      }
      this.toggleFavorite();
      this.toastController.create({
        message: 'Added to favorites',
        duration: 2000
      }).then(toast => toast.present());
    });
  }

  removeFavorite() {
    this.favoriteService.removeFavorite(this.contentId).then(success => {
      if (!success) {
        console.error('Error removing from favorites')
        return;
      }
      this.toggleFavorite();
      this.toastController.create({
        message: 'Removed from favorites',
        duration: 2000
      }).then(toast => toast.present());
    });
  }

  private toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  private async userHasReviewed() {
    if (!this.userService.isLogged) {
      return false;
    }
    let user = await this.userService.getCurrentUser();
    if (!user) {
      return false;
    }
    return this.reviewService.userHasReviewed(this.contentId, user.id);
  }
}
