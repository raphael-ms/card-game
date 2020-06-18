import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  emailRecovery = '';
  name = '';
  password = '';
  errorMessage = ' ';
  showRecover = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.style();
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['main-game']);
    }
  }

  validate() {
    this.authService.login(this.email, this.password).then(value => {
    }).catch(err => {
      this.errorMessage = err.message;
    });
  }
  emailRecover() {
    this.authService.sendPasswordResetEmail(this.emailRecovery).then(value => {
    }).catch(err => {
      this.errorMessage = err.message;
    });
    this.emailRecovery = '';
    this.showRecover = false;
  }

  register() {
    this.authService.register(this.email, this.password, this.name).then(value => {
    }).catch(err => {
      this.errorMessage = err.message;
    });
  }

  clearBox() {
    this.email = '';
    this.name = '';
    this.password = '';
    this.errorMessage = '';
    this.showRecover = false;
    this.emailRecovery = '';
  }

  googleLogin() {
    this.authService.loginWithGoogle();
  }


  style() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
  }

  showForgotPass() {
    this.showRecover = true;
  }

}