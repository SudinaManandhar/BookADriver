import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard], data: { role: 'user' }
  },
  // {
  //   path: 'admin-home',
  //   loadChildren: () => import('./admin-navbar/admin-navbar.module').then( m => m.AdminNavbarModule),
  //   canActivate: [AuthGuard], data: { role: 'admin' }
  // },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardModule),
    canActivate: [AuthGuard], data: { role: 'admin' }
  },
  {
    path: 'customer-list',
    loadChildren: () => import('./admin-customer-list/admin-customer-list.module').then( m => m.AdminCustomerListModule)
    // canActivate: [AuthGuard], data: { role: 'admin' }
  },
  {
    path: 'driver-list',
    loadChildren: () => import('./driver-list/driver-list.module').then( m => m.DriverListModule)
  },
  {
    path: 'booking-list',
    loadChildren: () => import('./admin-booking/admin-booking.module').then( m => m.AdminBookingModule)
    // canActivate: [AuthGuard], data: { role: 'admin' }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'bookedDrivers',
    title: 'Booked Drivers | BookADriver',
    loadChildren: () => import('./booked-drivers/booked-drivers.module').then(m => m.BookedDriversModule),
    canActivate: [AuthGuard], data: { role : 'user'}
  },
  {
    path:'login',
    title: 'Login | BookADriver',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path:'not-found',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: 'register',
    title: 'Register | BookADriver',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },
  {
    path:'**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
