import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { DriverListComponent } from '../driver-list/driver-list.component';

import { AddDriverComponent } from '../add-driver/add-driver.component';
import { BookDriverComponent } from '../book-driver/book-driver.component';
import { PopupComponent } from '../popup/popup.component';
import { RegisterComponent } from '../register/register.component';

import { HomePageRoutingModule } from './home-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    TooltipModule.forRoot()
  ],
  declarations: [HomePage, DriverListComponent, AddDriverComponent, BookDriverComponent, PopupComponent, RegisterComponent]
})
export class HomePageModule {}
