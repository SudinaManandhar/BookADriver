import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss'],
})
export class DriverDetailsComponent {

  @Input() driverId: string | undefined;
  @Output() popUpClosed = new EventEmitter<void>();
  driver: any;
  

  constructor(private driverService: DriverService) {}

  ngOnInit() {
    this.loadDriverDetails();
  }

  loadDriverDetails() {
    console.log(this.driverId);
    this.driverService.getDriverByid(this.driverId!).subscribe(driver => {
      this.driver = driver;
    });
  }

  onClose() {
    this.popUpClosed.emit(); // Clear driver details
  }

}
