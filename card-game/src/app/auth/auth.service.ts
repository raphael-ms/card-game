import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { ValidationEnum } from 'src/shared/enums/validation.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(public afAuth: AngularFireAuth, private ngZone: NgZone, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.ngZone.run(() => this.router.navigate(['main-game'])).then();
      } else {
        localStorage.setItem('user', null);
        localStorage.setItem('displayName', null);
      }
    });
  }

  async register(email: string, password: string, userInformed: string) {
    if (userInformed === '') {
      throw new Error(ValidationEnum.EMPTY_NAME_MSG);
    }
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(value => {
      this.afAuth.auth.currentUser.updateProfile({
        displayName: userInformed
      });
      console.log('usuario: ', this.afAuth.auth.currentUser);
      localStorage.setItem('displayName', JSON.stringify(userInformed));
      localStorage.setItem('user', JSON.stringify(this.afAuth.auth.currentUser));
    })
      .catch(err => {
        if (err.code === ValidationEnum.INVALID_EMAIL) {
          throw new Error(ValidationEnum.INVALID_EMAIL_MSG);
        }
        if (err.code === ValidationEnum.WEAK_PASSWORD) {
          throw new Error(ValidationEnum.WEAK_PASSWORD_MSG);
        }
        if (err.code === ValidationEnum.EMAIL_IN_USE) {
          throw new Error(ValidationEnum.EMAIL_IN_USE_MSG);
        }

      });
  }

  async login(email: string, password: string) {
    const result = await this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.ngZone.run(() => this.router.navigate(['main-game'])).then();
        localStorage.setItem('user', JSON.stringify(this.afAuth.auth.currentUser));
      })
      .catch(err => {
        if (err.code === ValidationEnum.INVALID_EMAIL) {
          throw new Error(ValidationEnum.INVALID_EMAIL_MSG);
        }
        if (err.code === ValidationEnum.WRONG_PASSWORD) {
          throw new Error(ValidationEnum.WRONG_PASSWORD_MSG);
        }
        if (err.code === ValidationEnum.USER_NOT_FOUND) {
          throw new Error(ValidationEnum.USER_NOT_FOUND_MSG);
        }
      });
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail).then()
      .catch(err => {
        if (err.code === ValidationEnum.INVALID_EMAIL) {
          throw new Error(ValidationEnum.INVALID_EMAIL_MSG);
        }
        if (err.code === ValidationEnum.USER_NOT_FOUND) {
          throw new Error(ValidationEnum.USER_NOT_FOUND_MSG);
        }
      });

  }

  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('displayName');
    this.ngZone.run(() => this.router.navigate(['login'])).then();
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(value => {
      localStorage.setItem('user', JSON.stringify(this.afAuth.auth.currentUser));
      this.ngZone.run(() => this.router.navigate(['main-game'])).then();
    })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }
}
