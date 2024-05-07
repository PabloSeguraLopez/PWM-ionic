import { Content } from "../interfaces/content";
import { Observable } from "rxjs";
import { Review } from "../interfaces/review";
import { User } from "../interfaces/user";
import {DocumentData, QuerySnapshot} from "@angular/fire/compat/firestore";

export abstract class ContentService {
  abstract getContentById(documentId: string): Observable<Content>;
  abstract getContents(): Observable<Content[]>;
  abstract getContentByName(title:string): Promise<Content[]>;
  abstract getReviewsById(documentId: string): Observable<Review[]>;
  abstract addReview(user: User, content: Content, rating: number, reviewText: string): void;
}
