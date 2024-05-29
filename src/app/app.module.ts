import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';

import { NavbarComponent } from './navbar/navbar.component';
import { BookedDriversComponent } from './booked-drivers/booked-drivers.component';
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DriverService } from './driver.service';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
@NgModule({
  declarations: [AppComponent, NavbarComponent, BookedDriversComponent, NotFoundComponent, DriverDetailsComponent],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, TooltipModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DriverService, {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi:true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
