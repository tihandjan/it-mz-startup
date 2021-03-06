import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminGuard } from '../guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { NewRecipeComponent } from './recipies/new-recipe.component';
import { EditRecipeComponent } from "./recipies/edit-recipe.component";

const routes: Routes = [
  {
      path: '', component: AdminComponent,
      canActivate: [AdminGuard],
      children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'users', component: UserComponent },
          { path: 'tables', component: TablesComponent },
          { path: 'notifications', component: NotificationsComponent },
          { path: 'recipies', component: RecipiesComponent },
          { path: 'recipies/new', component: NewRecipeComponent },
          { path: 'recipies/:slug/edit', component: EditRecipeComponent },
      ]
  },
  {
      path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

export const routedComponents = [AdminComponent];