import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc, docData,
  Firestore,
  getDocs,
  query, setDoc,
  where
} from "@angular/fire/firestore";
import { User } from "../interfaces/user";
import { Content } from "../interfaces/content";
import { Review } from "../interfaces/review";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private firestore: Firestore) { }

  async addReview(content: Content, user: User, rating: number, review: string) {
    const collectionRef = collection(this.firestore, 'reviews');
    const querySnapshot = await this.queryReviewByContentAndUser(content.id, user.id);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        setDoc(doc.ref, {
          userId: user.id,
          contentId: content.id,
          rating: rating,
          review: review
        });
      })
      return;
    }
    return addDoc(collectionRef, {
      userId: user.id,
      contentId: content.id,
      rating: rating,
      review: review
    })
  }

  queryReviewByContentAndUser(contentId: string, userId: string) {
    const collectionRef = collection(this.firestore, 'reviews');
    const q = query(collectionRef, where('userId', '==', userId), where('contentId', '==', contentId));
    return getDocs(q);
  }

  getReviewById(reviewId: string): Observable<Review> {
    const documentRef = doc(this.firestore, 'reviews', reviewId);
    return docData(documentRef) as Observable<Review>;
  }
  queryReviewByContent(contentId: string) {
    const collectionRef = collection(this.firestore, 'reviews');
    const q = query(collectionRef, where('contentId', '==', contentId));
    return getDocs(q);
  }
}
