import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDriverListComponent } from './admin-driver-list.component';

const routes: Routes = [
  {
    path: '',
    title: 'Admin Driver List | BookYourDriver',
    component: AdminDriverListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDriverListRoutingModule { }
