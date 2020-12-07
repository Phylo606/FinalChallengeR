import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app'
import  'firebase/auth';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  user: Observable<User[]>;
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;
  newBooking: any;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    public toastr: ToastrService) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.db.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
    }

  getUserState() {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      this.toastr.error(error);
    })
    .then(userCredential => {
      if (userCredential) {
        this.router.navigate(['/add-match']);
        this.toastr.success("Weclome, " + userCredential.user.displayName)
      }
    })
  }

  createUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;

        userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName + ' ' + (user.role)
        });

        this.insertUserData(userCredential);
        this.toastr.success("User successfully created")
        this.router.navigate(['/add-match']);
      })
      .catch(error => {
        this.toastr.error(error)
    })
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: this.newUser.role
    })
  }

  async signOut() {
    await this.afAuth.auth.signOut();
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user)
      .then(() => {
        this.router.navigate(['/add-match']);
        this.toastr.success("Welcome " + credential.user.displayName)
    });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`Users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displaName,
      photoURL: user.photoURL
    }

    return userRef.set(data, {merge: true})
  }


}
