import { Injectable } from '@angular/core';
import { User } from "../interfaces/user";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";
import {collection, doc, docData, Firestore, getDoc, getDocs, query, setDoc, where, updateDoc} from "@angular/fire/firestore";
import {BehaviorSubject, Observable} from "rxjs";
import {getDownloadURL, ref, Storage, uploadBytes} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _isLoggedIn$: BehaviorSubject<boolean>;
  constructor(private auth: Auth, private firestore: Firestore, private storage: Storage) {
    this._isLoggedIn$ = new BehaviorSubject<boolean>(false);
  }

  isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn$.asObservable();
  }

  isLoggedIn(){
    return this._isLoggedIn$.value;
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

  async createUser(email: string, username: string, password: string, profilePictureReference:string) {
    let userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    this.createUserDocument(user.uid, email, username, profilePictureReference);
  }

  private createUserDocument(uid: string, email: string, username: string, profilePictureReference:string) {
    let documentReference = doc(this.firestore, 'users', uid);
    setDoc(documentReference, {
      email: email,
      username: username,
      profilePicture: profilePictureReference
    });
  }

  async login(email: string, password: string) {
    let userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    if (userCredential.user) {
      this._isLoggedIn$.next(true);
      return true;
    }
    return false;
  }

  logout() {
    this._isLoggedIn$.next(false);
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

  public uploadToCloudStorage(fileName: string, data: any) {
    uploadBytes(ref(this.storage,`archivos/${fileName}`), data);
  }

  public async referenceToFileInCloudStorage(fileName: string) {
    return getDownloadURL(ref(this.storage,`archivos/${fileName}`));
  }

}
