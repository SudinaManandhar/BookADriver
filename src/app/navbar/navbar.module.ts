import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarRoutingModule } from './navbar-routing.module';
import { BookedDriversComponent } from '../booked-drivers/booked-drivers.component';
import { LoginComponent } from '../login/login.component';


@NgModule({
  declarations: [BookedDriversComponent, LoginComponent],
  imports: [
    CommonModule,
    NavbarRoutingModule
  ]
})
export class NavbarModule { }
