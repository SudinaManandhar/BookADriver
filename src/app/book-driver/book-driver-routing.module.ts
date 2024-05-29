import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDriverComponent } from './book-driver.component';

const routes: Routes = [
  {
    path:'',
    component: BookDriverComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookDriverRoutingModule { }
