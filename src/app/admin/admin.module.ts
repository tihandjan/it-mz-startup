import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Angular2TokenService } from 'angular2-token';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SelectModule} from 'ng2-select';

import { AdminComponent } from './admin.component';
import { AdminAuthService } from '../services/admin-auth';
import { IngredientService } from '../services/ingredient';
import { CategoryService } from '../services/category';
import { AdminGuard } from '../guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { IconsComponent } from './icons/icons.component';
import { TablesComponent } from './tables/tables.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { NewRecipeComponent } from './recipies/new-recipe.component';


@NgModule({
    imports: [
        AdminRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, SelectModule
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
        RecipiesComponent,
        NewRecipeComponent
    ],
    providers: [Angular2TokenService, AdminGuard, AdminAuthService, IngredientService, CategoryService],
})
export class AdminModule { }
