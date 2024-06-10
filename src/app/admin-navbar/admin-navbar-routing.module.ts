import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNavbarComponent } from './admin-navbar.component';
import { AdminCustomerListComponent } from '../admin-customer-list/admin-customer-list.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent
  },
  {
    path: 'customer-list',
    loadChildren: () => import('../admin-customer-list/admin-customer-list.module').then(m => m.AdminCustomerListModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminNavbarRoutingModule { }
