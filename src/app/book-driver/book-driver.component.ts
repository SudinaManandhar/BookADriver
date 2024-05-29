import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DriverService } from '../driver.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-driver',
  templateUrl: './book-driver.component.html',
  styleUrls: ['./book-driver.component.scss'],
})
export class BookDriverComponent  implements OnInit {

  @Output() optionClosed = new EventEmitter<void>();

  drivers: any[] = [];
  selectedDriver: any | undefined;

  constructor(private driverService: DriverService, private location: Location) { }

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
      this.selectedDriver.isBooked = true;
      this.driverService.updateDriver(this.selectedDriver).subscribe(updatedDriver => {
        // Update the local drivers array with the updated driver
        const index = this.drivers.findIndex(driver => driver.id === updatedDriver.id);
        if (index !== -1) {
          this.drivers[index] = updatedDriver;
          alert("Driver has been booked");
        }
      });
    } else {
      alert("Driver has already been booked");
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

