import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBookingComponent } from './admin-booking.component';

const routes: Routes = [
  {
    path:'',
    component: AdminBookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBookingRoutingModule { }
