import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DriverService } from '../driver.service';
import { BookingService } from '../service/booking.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss'],
})
export class DriverDetailsComponent {

  @Input() driverId: string | undefined;
  @Output() popUpClosed = new EventEmitter<void>();
  driver: any;
  booking: any;
  bookedDriver: any;
  

  constructor(private driverService: DriverService, private bookingService: BookingService) {}

  ngOnInit() {
    this.loadDriverDetails();
    // this.loadBookings();
  }

  loadDriverDetails() {
    console.log(this.driverId);
    this.driverService.getDriverByid(this.driverId!).subscribe(driver => {
      this.driver = driver;
    });
  }

  loadBookings(){
    this.bookingService.getBookingById(this.driverId!).subscribe(booking => {
      this.booking = booking;
    });
  }

  onClose() {
    this.popUpClosed.emit(); // Clear driver details
  }

}
