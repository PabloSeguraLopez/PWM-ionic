import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { Content } from "../../interfaces/content";
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { PlatformService } from "../../services/platform.service";
import { ReviewComponent } from "./review/review.component";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ContentService } from "../../services/content.service";
import { AddContentComponent } from "../add-content/add-content.component";
import { IonicModule, IonModal } from "@ionic/angular";

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
    IonicModule
  ],
  templateUrl: './content-details.component.html',
  styleUrl: './content-details.component.scss'
})
export class ContentComponent implements OnInit {
  @Input()
  protected contentId: string = "";
  protected contentService: ContentService | undefined;
  protected content?: Content;
  isAddContentOpen: boolean = false;

  @ViewChild(IonModal) modal?: IonModal;

  constructor(private platformService: PlatformService, private injector: Injector, private route: ActivatedRoute) { }

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

  getPlatformUrl(platform: string): string {
    return this.platformService.getPlatformUrl(platform);
  }

  getPlatformIconClass(platform: string): string {
    return this.platformService.getPlatformIconUrl(platform);
  }

  toggleAddContent() {
    this.isAddContentOpen = !this.isAddContentOpen;
  }

  onWillDismiss($event: Event) {
    console.log('will dismiss', $event);

  }

  cancel() {
    this.modal?.dismiss(null, 'cancel');
  }
}
