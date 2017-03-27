import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { LeftSidenavMenuComponent } from './left-sidenav-menu/left-sidenav-menu.component';
import { RightSidenavMenuComponent } from './right-sidenav-menu/right-sidenav-menu.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AdminAuthService } from '../services/admin-auth';
import { UserAuthService } from '../services/user-auth';
import { Angular2TokenService } from 'angular2-token';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule
    ],
    exports: [
        LeftSidenavMenuComponent,
        RightSidenavMenuComponent,
        FooterComponent,
        HeaderComponent
    ],
    declarations: [
        LeftSidenavMenuComponent,
        RightSidenavMenuComponent,
        FooterComponent,
        HeaderComponent
    ],
    providers: [AdminAuthService, Angular2TokenService, UserAuthService],
})
export class SharedModule { }