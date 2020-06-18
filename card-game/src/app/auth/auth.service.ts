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
        // this.user = user;
        // localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['main-game']);
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  async register(email: string, password: string, userInformed: string) {
    if (userInformed === '') {
      throw new Error('NOME VAZIO: Informe seu nome, corretamente');
    }
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(value => {
      this.afAuth.auth.currentUser.updateProfile({
        displayName: userInformed
      });
      localStorage.setItem('user', JSON.stringify(this.afAuth.auth.currentUser));
    })
      .catch(err => {
        if (err.code === 'auth/invalid-email') {
          throw new Error('E-MAIL INCORRETO: O e-mail informado esta mal formatado');
        }
        if (err.code === 'auth/weak-password') {
          throw new Error('SENHA FRACA: Sua senha tem que ter ao menos 6 caracteres');
        }
        if (err.code === 'auth/email-already-in-use') {
          throw new Error('E-MAIL JÁ EM USO: O e-mail informado já esta sendo utilizado');
        }

      });
  }

  async login(email: string, password: string) {
    const result = await this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigate(['main-game']);
        localStorage.setItem('user', JSON.stringify(this.afAuth.auth.currentUser));
      })
      .catch(err => {
        if (err.code === 'auth/invalid-email') {
          throw new Error('E-MAIL INCORRETO: O e-mail informado esta mal formatado');
        }
        if (err.code === 'auth/wrong-password') {
          throw new Error('SENHA INCORRETA: A senha esta incorreta ou o e-mail não esta cadastrado');
        }
        if (err.code === 'auth/user-not-found') {
          throw new Error('USUÁRIO NÃO ENCONTRADO: Não existe registros do e-mail informado. Esta conta deve ter sido deletada');
        }
      });
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail).then()
      .catch(err => {
        if (err.code === 'auth/invalid-email') {
          throw new Error('E-MAIL INCORRETO: O e-mail informado esta mal formatado');
        }
        if (err.code === 'auth/user-not-found') {
          throw new Error('USUÁRIO NÃO ENCONTRADO: Não existe registros do e-mail informado. Esta conta deve ter sido deletada');
        }
      });

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
      localStorage.setItem('user', JSON.stringify(this.afAuth.auth.currentUser));
      this.router.navigate(['main-game']);
    })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }
}
