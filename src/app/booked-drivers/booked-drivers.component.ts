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
  showDetailsPopup: boolean = false;
  selectedDriverId: string | undefined;

  searchTerm: string = '';
  sortColumn: string = 'name';
  sortDirection: string = 'asc';
  
  constructor(private driverService: DriverService, private newService: NewServiceService, private location: Location) { }

  ngOnInit(): void {
  //   this.driverService.getDrivers().subscribe(data => {
  //   this.drivers = data;
  // });

  this.driverService.getDrivers().subscribe(data => {
    this.drivers = data.filter(driver => driver.isBooked);
  });
}

get filteredBookedDrivers() {
    
  const filtered = this.drivers.filter(driver => 
    driver.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    driver.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    driver.contact.toLowerCase().includes(this.searchTerm.toLowerCase()) 
  );

  return filtered.sort((a, b) => {
    if (a[this.sortColumn] < b[this.sortColumn]) {
      return this.sortDirection === 'asc' ? -1 : 1;
    } if (a[this.sortColumn] > b[this.sortColumn]) {
      return this.sortDirection === 'asc' ? 1 : -1;
    } 
    return 0;
  });
}

onSort(event: any) {
  this.sortColumn = event.column.prop;
  this.sortDirection = event.sorts[0].dir;
}

openDeletePopup(driverId: number) {
  this.newService.showPopup(driverId);
}

openDetailsPopup(driverId: string){
  this.selectedDriverId = driverId;
  console.log(driverId);
  this.showDetailsPopup = true;
}

closeDetailsPopup() {
  this.showDetailsPopup = false;
  this.selectedDriverId = undefined;
}

onPopUpClosed(){
  this.showDetailsPopup = false;
}

goBack(){
  this.location.back();
}
}
