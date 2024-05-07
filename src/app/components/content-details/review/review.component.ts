import { Component, Input } from '@angular/core';
import { Review } from "../../../interfaces/review";
import { NgIf } from "@angular/common";
import { ReviewService } from "../../../services/review.service";
import { User } from "../../../interfaces/user";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input()
  id: string = '';
  review: Review | null = null;
  user: User | null = null;

  constructor(private reviewService: ReviewService, private userService: UserService) { }

  ngOnInit() {
    this.reviewService.getReviewById(this.id).subscribe(
      review => {
        this.review = review
        this.userService.getUserById(this.review.userId).subscribe(
          user => this.user = user
        )
      }
    )
  }
}
