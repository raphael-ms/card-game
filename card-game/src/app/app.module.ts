import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AngularFireModule } from '@angular/fire';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { CardGameComponent } from './card-game/card-game.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

const config = {
  apiKey: 'AIzaSyBNxz4pDeXiUNvpBurb0pRvw94NO_H4Q-Q',
  authDomain: 'card-gamee.firebaseapp.com',
  databaseURL: 'https://card-gamee.firebaseio.com',
  projectId: 'card-gamee',
  storageBucket: 'card-gamee.appspot.com',
  messagingSenderId: '1091266771398',
  appId: '1:1091266771398:web:db241497bdae033d135ac7',
  measurementId: 'G-0KFR5HL7K4'
};

@NgModule({
  declarations: [AppComponent, LoginComponent, ForgotPasswordComponent, VerifyEmailComponent, CardGameComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    AngularFireModule.initializeApp(config),
    AngularSvgIconModule.forRoot(),
    AngularFireAuthModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
