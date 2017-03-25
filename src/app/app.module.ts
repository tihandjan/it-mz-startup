import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LeftSidenavMenuComponent } from './shared/left-sidenav-menu/left-sidenav-menu.component';
import { RightSidenavMenuComponent } from './shared/right-sidenav-menu/right-sidenav-menu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { AdminAuthService } from './services/admin-auth';
import { Angular2TokenService } from 'angular2-token';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LeftSidenavMenuComponent,
    RightSidenavMenuComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AdminAuthService, Angular2TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
