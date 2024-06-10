import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { BookingService } from '../service/booking.service';
import { CommonServiceService } from '../service/common-service.service';
import { Observable } from 'rxjs';

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

  constructor(private http:HttpClient, private location:Location, private bookingService: BookingService, private commonService: CommonServiceService) { }

  ngOnInit(): void{
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBooking().subscribe(data => {
      this.bookings = data;
    });
  }
  
  goBack(): void{
    this.location.back();
  }

  confirmDelete(bookId: string, driverId: string): void {
    this.bookingIdToDelete = bookId;
    this.driverIdToUpdate = driverId;
    this.showConfirmation = true;
  }

  closeConfirmation(): void {
    this.showConfirmation = false;
    this.bookingIdToDelete = null;
  }

  deleteBooking(){

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
