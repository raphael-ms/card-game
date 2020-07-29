import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LoginComponent } from './auth/login/login.component';
import { CardGameComponent } from './card-game/card-game.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { environment } from 'src/environments/environment';
import { GameOverComponent } from './game-over/game-over.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// custom directives
import { PreventDoubleClickDirective } from '../directives/no-double-click.directive';
import { LoadingCardComponent } from './loading-card/loading-card.component';
import { RankingComponent } from './ranking/ranking.component';
import { BlockUiComponent } from './block-ui/block-ui.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FinalScreenComponent } from './final-screen/final-screen.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LoginComponent, CardGameComponent, GameOverComponent, PreventDoubleClickDirective, LoadingCardComponent, RankingComponent, BlockUiComponent, FinalScreenComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatProgressBarModule,
    MatMenuModule,
    AngularFireModule.initializeApp(environment.config),
    AngularSvgIconModule.forRoot(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [GameOverComponent]
})
export class AppModule { }
