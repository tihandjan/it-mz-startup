import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AdminAuthService } from './services/admin-auth';
import { UserAuthService } from './services/user-auth';
import { Angular2TokenService } from 'angular2-token';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [AdminAuthService, Angular2TokenService, UserAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
