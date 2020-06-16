import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularSvgIconModule } from "angular-svg-icon";

const config = {
  apiKey: "AIzaSyBNxz4pDeXiUNvpBurb0pRvw94NO_H4Q-Q",
  authDomain: "card-gamee.firebaseapp.com",
  databaseURL: "https://card-gamee.firebaseio.com",
  projectId: "card-gamee",
  storageBucket: "card-gamee.appspot.com",
  messagingSenderId: "1091266771398",
  appId: "1:1091266771398:web:db241497bdae033d135ac7",
  measurementId: "G-0KFR5HL7K4",
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularSvgIconModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
