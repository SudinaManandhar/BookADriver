import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverListComponent } from './driver-list.component';

const routes: Routes = [
  {
    path: '',
    title: 'Driver List | BookYourDriver',
    component: DriverListComponent
  },
  {
    path:'bookDriver',
    loadChildren: () => import('../book-driver/book-driver.module').then(m => m.BookDriverModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverListRoutingModule { }
