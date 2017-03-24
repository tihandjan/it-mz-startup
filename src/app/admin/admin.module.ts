import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Angular2TokenService } from 'angular2-token';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { AdminAuthService } from '../services/admin-auth';
import { AdminGuard } from '../guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        AdminRoutingModule,
        CommonModule
    ],
    exports: [],
    declarations: [
        AdminComponent,
        DashboardComponent,
        LoginComponent
    ],
    providers: [Angular2TokenService, AdminGuard, AdminAuthService],
})
export class AdminModule { }
