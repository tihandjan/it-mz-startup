import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { UserAuthService } from './services/user-auth';
import { RecipeService } from './services/recipe';
import { VoteService } from "./services/vote";
import { Angular2TokenService } from 'angular2-token';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [Angular2TokenService, UserAuthService, RecipeService, VoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
