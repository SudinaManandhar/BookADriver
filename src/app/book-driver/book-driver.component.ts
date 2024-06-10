import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DriverService } from '../driver.service';
import { CommonServiceService } from '../service/common-service.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-driver',
  templateUrl: './book-driver.component.html',
  styleUrls: ['./book-driver.component.scss'],
})
export class BookDriverComponent  implements OnInit {

  @Output() optionClosed = new EventEmitter<void>();

  drivers: any[] = [];
  selectedDriver: any | undefined;

  constructor(private http: HttpClient, private commonService: CommonServiceService, private driverService: DriverService, private location: Location) { }

  ngOnInit(): void {
      this.driverService.getDrivers().subscribe(data => {
      this.drivers = data;
    });
  }

  onSelect(event: Event){
  // const selectedValue = parseInt((event.target as HTMLSelectElement).value);
  //   this.driverService.getDriverById(selectedValue)
  //     .subscribe(driver => this.selectedDriver = driver);

  //     const driverId = +selectedValue;
  //     this.selectedDriver = this.drivers.find(driver => parseInt(driver.id) === driverId) || null;

    const selectElement = event.target as HTMLSelectElement;
    // const selectedValue = parseInt(selectElement.value, 10);
    const driverId = selectElement.value;
    this.selectedDriver = this.drivers.find(driver => driver.id === driverId) || null;
    console.log(this.selectedDriver);
    }

  bookDriver(): void {
    if (this.selectedDriver) {
      if(!this.selectedDriver.isBooked){
        
      const bookingDetails = {
        user: this.commonService.getUserDetails(),
        driver: this.selectedDriver
      }

      this.http.post('http://localhost:3000/booked',bookingDetails).subscribe(
        () => {
          this.selectedDriver.isBooked = true;
          this.driverService.updateDriver(this.selectedDriver).subscribe(updatedDriver => {
          // Update the local drivers array with the updated driver
          const index = this.drivers.findIndex(driver => driver.id === updatedDriver.id);
          if (index !== -1) {
            this.drivers[index] = updatedDriver;
            alert("Driver Has Been Booked");
          }
        });
    });
  } else {
      alert("Driver Has Already Been Booked");
    }
  }
}

  goBack(): void{
    this.location.back();
  }

  onCancel(){
    this.optionClosed.emit();
  }
  

}

