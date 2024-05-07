import { Injectable } from '@angular/core';
import { Content } from "../interfaces/content";
import {
  arrayUnion,
  collection,
  collectionData,
  doc,
  docData,
  Firestore, getDocs, query,
  updateDoc, where
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Review } from "../interfaces/review";
import { ContentService } from "./content.service";
import { User } from '../interfaces/user';
import { ReviewService } from "./review.service";
import {user} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class SeriesService implements ContentService {

  constructor(private firestore: Firestore, private reviewService: ReviewService) {
  }

  addReview(user: User, content: Content, rating: number, review: string): void {
    this.reviewService.addReview(content, user, rating, review).then(
      documentRef => {
        if (documentRef) {
          const id = documentRef.id
          const contentRef = doc(this.firestore, 'series', content.id);
          updateDoc(contentRef, {
            reviews: arrayUnion(id)
          })
        }
      }
    )
  }

  getContents(): Observable<Content[]> {
    const contentsRef = collection(this.firestore, 'series');
    return collectionData(contentsRef, { idField: 'id' }) as Observable<Content[]>;
  }

  getContentById(documentId: string): Observable<Content> {
    const contentRef = doc(this.firestore, 'series', documentId);
    return new Observable<Content>(
      observer => {
        docData(contentRef).subscribe(
          documentSnapshot => {
            const content = documentSnapshot as Content;
            content.id = documentId;
            observer.next(content);
          });
      }
    );
  }

  getReviewsById(documentId: string): Observable<Review[]> {
    const reviewsRef = collection(this.firestore, 'series/' + documentId + '/reviews');
    return collectionData(reviewsRef, { idField: 'id' }) as Observable<Review[]>;
  }

  async getContentByName(title: string) {
    const collectionRef = collection(this.firestore, 'series');
    const q = query(collectionRef, where('title', '==', title));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => {
      const data = doc.data() as Content;
      data.id = doc.id;
      return data;
    });
  }
}

