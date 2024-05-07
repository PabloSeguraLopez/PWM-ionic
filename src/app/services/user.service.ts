import { Injectable } from '@angular/core';
import { User } from "../interfaces/user";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";
import {collection, doc, docData, Firestore, getDoc, getDocs, query, setDoc, where, updateDoc} from "@angular/fire/firestore";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLogged: boolean = false;
  private isLoggedInSubject: BehaviorSubject<boolean>;
  constructor(private auth: Auth, private firestore: Firestore) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.isLogged);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  async getCurrentUser() {
    const fireStoreUser = this.auth.currentUser;
    if (fireStoreUser) {
      let documentReference = doc(this.firestore, 'users', fireStoreUser.uid);
      let documentSnapshot = await getDoc(documentReference);
      let user = documentSnapshot.data() as User;
      user.id = documentSnapshot.id;
      return user;
    } else {
      return null;
    }
  }

  async createUser(email: string, username: string, password: string) {
    let userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    this.createUserDocument(user.uid, email, username);
  }

  private createUserDocument(uid: string, email: string, username: string) {
    let documentReference = doc(this.firestore, 'users', uid);
    setDoc(documentReference, {
      email: email,
      username: username
    });
  }

  login(email: string, password: string) {
    this.isLogged = true;
    this.isLoggedInSubject.next(this.isLogged);
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    this.isLogged = false;
    this.isLoggedInSubject.next(this.isLogged);
    return signOut(this.auth);
  }

  getUserById(userId: string): Observable<User> {
    let documentReference = doc(this.firestore, 'users', userId);
    return docData(documentReference) as Observable<User>;
  }

  async updateUsername(userId: string, newUsername: string) {
    try {
      let documentReference = doc(this.firestore, 'users', userId);
      await updateDoc(documentReference, {username: newUsername});
      console.log('Nombre de usuario actualizado correctamente en Firestore');
    } catch (error) {
      console.error('Error al actualizar el nombre de usuario en Firestore:', error);
      throw error;
    }
  }
  getUserReviews(userId:string){
    const collectionRef = collection(this.firestore, 'reviews');
    const q = query(collectionRef, where('userId', '==', userId));
    return getDocs(q);
  }
 }
