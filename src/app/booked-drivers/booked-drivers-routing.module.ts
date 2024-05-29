import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookedDriversComponent } from './booked-drivers.component';

const routes: Routes = [
  {
    path: '',
    component: BookedDriversComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookedDriversRoutingModule { }
