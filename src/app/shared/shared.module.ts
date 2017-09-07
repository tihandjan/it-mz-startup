import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { LeftSidenavMenuComponent } from './left-sidenav-menu/left-sidenav-menu.component';
import { RightSidenavMenuComponent } from './right-sidenav-menu/right-sidenav-menu.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CommentsComponent } from "./comments/comments.component";
import { CommentItemComponent } from "./comments/comment-item.component";

import { AdminAuthService } from '../services/admin-auth';
import { UserAuthService } from '../services/user-auth';
import { CommentService } from '../services/comment';
import { Angular2TokenService } from 'angular2-token';

import { TruncatePipe } from '../pipes/truncate.pipe';

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
        HeaderComponent,
        CommentItemComponent,
        CommentsComponent,
        TruncatePipe,
    ],
    declarations: [
        LeftSidenavMenuComponent,
        RightSidenavMenuComponent,
        FooterComponent,
        HeaderComponent,
        CommentItemComponent,
        CommentsComponent,
        TruncatePipe,
    ],
    providers: [AdminAuthService, Angular2TokenService, UserAuthService, CommentService, { provide: LOCALE_ID, useValue: "ru-RU" },],
})
export class SharedModule { }