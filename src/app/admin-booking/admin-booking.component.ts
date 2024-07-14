import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { BookingService } from '../service/booking.service';
import { CommonServiceService } from '../service/common-service.service';
import { Observable } from 'rxjs';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-admin-booking',
  templateUrl: './admin-booking.component.html',
  styleUrls: ['./admin-booking.component.scss'],
})
export class AdminBookingComponent  implements OnInit {
  bookings: any[] = [];
  customers: any[] = [];
  showConfirmation: boolean = false;
  bookingIdToDelete: string | null=null;
  driverIdToUpdate: string | null=null;
  showForm = false;
  searchTerm: string = '';
  sortColumn: string = 'name';
  sortDirection: string = 'asc';

  constructor(private http:HttpClient, private location:Location, private bookingService: BookingService, private commonService: CommonServiceService) { }

  ngOnInit(): void{
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBooking().subscribe(data => {
      this.bookings = data;
      console.log(this.bookings);
    });
  }

  // loadBookings() {
  //   console.log(this.http.get<any[]>('http://localhost:3000/booked'));
  //   this.http.get<any[]>('http://localhost:3000/booked');
  //   }
  
  goBack(): void{
    this.location.back();
  }

  get filteredBookings() {
    
    const filtered = this.bookings.filter(booking => 
      booking.driver.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      booking.driver.contact.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      booking.driver.rate.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      booking.user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      booking.user.phone.toLowerCase().includes(this.searchTerm.toLowerCase())
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


  confirmDelete(bookId: string, driverId: string): void {
    this.bookingIdToDelete = bookId;
    this.driverIdToUpdate = driverId;
    this.showConfirmation = true;
  }

  closeConfirmation(): void {
    this.showConfirmation = false;
    this.bookingIdToDelete = null;
    this.driverIdToUpdate = null;
  }

  deleteBooking(): void{
    if(this.bookingIdToDelete && this.driverIdToUpdate){
      this.bookingService.deleteBooking(this.bookingIdToDelete).subscribe(()=>{
        if(this.driverIdToUpdate){
          this.updateDriverStatus(this.driverIdToUpdate);
        } 
      });
    }
  }

  updateDriverStatus(driverId: string): void{
    this.bookingService.getDriver(driverId).subscribe(driver => {
      if(driver){
        driver.isBooked = false;
        this.bookingService.updateDriver(driver).subscribe(() => {
          this.loadBookings();
          this.closeConfirmation();
        });
      }  
    });
  }

  bookDriver(){
    this.showForm = true;
  }

  onBookingAdded(){
    this.loadBookings();
  }

  onFormClosed(){
    this.showForm = false;
  }
}
