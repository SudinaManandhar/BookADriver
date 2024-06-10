import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = "http://localhost:3000/booked";
  private driverUrl = "http://localhost:3000/drivers";

  constructor(private http: HttpClient) { }

  getBooking(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateDriverBookingStatus(driverId: string, isBooked: boolean): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/drivers/${driverId}`, { isBooked });
  }

  deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/booked/${bookingId}`);
  }

  deleteBookingAndToggleDriver(bookingId: string, driverId: string): Observable<any> {
    return this.updateDriverBookingStatus(driverId, false).pipe(
      switchMap(() => this.deleteBooking(bookingId))
    );
  }
}
