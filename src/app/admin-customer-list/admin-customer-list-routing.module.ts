import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCustomerListComponent } from './admin-customer-list.component';

const routes: Routes = [
  {
    path:'',
    component: AdminCustomerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCustomerListRoutingModule { }
