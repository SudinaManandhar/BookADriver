import { Component, OnInit } from '@angular/core';
import { DriverService } from '../driver.service';
import { NewServiceService } from '../service/new-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-booked-drivers',
  templateUrl: './booked-drivers.component.html',
  styleUrls: ['./booked-drivers.component.scss'],
})
export class BookedDriversComponent  implements OnInit {

  drivers: any[]=[];
  
  constructor(private driverService: DriverService, private newService: NewServiceService, private location: Location) { }

  ngOnInit(): void {
  //   this.driverService.getDrivers().subscribe(data => {
  //   this.drivers = data;
  // });

  this.driverService.getDrivers().subscribe(data => {
    this.drivers = data.filter(driver => driver.isBooked);
  });
}

openDeletePopup(driverId: number) {
  this.newService.showPopup(driverId);
}

goBack(){
  this.location.back();
}
}
