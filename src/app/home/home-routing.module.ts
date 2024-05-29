import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    title: 'Landing Page | BookYourDriver'
  },
  {
    path: 'driverList',
    loadChildren: () => import('../driver-list/driver-list.module').then(m => m.DriverListModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
