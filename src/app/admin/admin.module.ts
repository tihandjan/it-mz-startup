import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Angular2TokenService } from 'angular2-token';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SelectModule} from 'ng2-select';

import { AdminAuthService } from '../services/admin-auth';
import { IngredientService } from '../services/ingredient';
import { CategoryService } from '../services/category';
import { CountryService } from '../services/country';

import { AdminGuard } from '../guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { NewRecipeComponent } from './recipies/new-recipe.component';

import { AdminComponent } from './admin.component';

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
        TablesComponent,
        NotificationsComponent,
        RecipiesComponent,
        NewRecipeComponent
    ],
    providers: [Angular2TokenService, AdminGuard, AdminAuthService, IngredientService, CategoryService, CountryService],
})
export class AdminModule { }
