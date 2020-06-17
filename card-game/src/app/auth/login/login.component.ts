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
  name = '';
  password = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.style();
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['main-game']);
    }
  }

  validate() {
    this.authService.login(this.email, this.password);
  }

  register() {
    this.authService.register(this.email, this.password, this.name);
  }

  clearBox() {
    this.email = '';
    this.name = '';
    this.password = '';
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


}
