import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  register(email: string, password: string, user: string) {
    const result = this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(value => {
      this.router.navigate(['main-game']);
      return result.user.updateProfile({
        displayName: user
      });
    })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
    this.sendEmailVerification();
  }

  login(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigate(['main-game']);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  sendEmailVerification() {
    this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['verify-email']);
  }

  sendPasswordResetEmail(passwordResetEmail: string) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(value => {
      console.log('Success!', value);

      this.router.navigate(['main-game']);
    })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
    this.sendEmailVerification();
  }
}
