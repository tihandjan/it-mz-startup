import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Angular2TokenService } from 'angular2-token';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { AdminAuthService } from '../services/admin-auth';
import { AdminGuard } from '../guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { IconsComponent } from './icons/icons.component';
import { TablesComponent } from './tables/tables.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RecipiesComponent } from './recipies/recipies.component';

@NgModule({
    imports: [
        AdminRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        AdminComponent,
        DashboardComponent,
        LoginComponent,
        UserComponent,
        IconsComponent,
        TablesComponent,
        NotificationsComponent,
        RecipiesComponent
    ],
    providers: [Angular2TokenService, AdminGuard, AdminAuthService],
})
export class AdminModule { }
