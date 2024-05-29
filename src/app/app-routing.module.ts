import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'bookedDrivers',
    loadChildren: () => import('./booked-drivers/booked-drivers.module').then(m => m.BookedDriversModule)
    // canActivate: [AuthGuard]
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
