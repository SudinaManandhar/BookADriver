import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';

import { NavbarComponent } from './navbar/navbar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BookedDriversComponent } from './booked-drivers/booked-drivers.component';
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminCustomerListComponent } from './admin-customer-list/admin-customer-list.component';
import { AdminBookingComponent } from './admin-booking/admin-booking.component';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DriverService } from './driver.service';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  declarations: [AppComponent, NavbarComponent, BookedDriversComponent, NotFoundComponent, DriverDetailsComponent, AdminNavbarComponent, AdminCustomerListComponent, AdminBookingComponent, AdminDashboardComponent],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, TooltipModule.forRoot(), CommonModule, NgxEchartsModule.forRoot({ echarts: () => import('echarts') }), NgxDatatableModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DriverService, {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi:true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
