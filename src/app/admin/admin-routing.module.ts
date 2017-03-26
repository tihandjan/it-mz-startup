import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminGuard } from '../guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { IconsComponent } from './icons/icons.component';
import { TablesComponent } from './tables/tables.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
      path: '', component: AdminComponent,
      canActivate: [AdminGuard],
      children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'users', component: UserComponent },
          { path: 'icons', component: IconsComponent },
          { path: 'tables', component: TablesComponent },
          { path: 'notifications', component: NotificationsComponent },
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