import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = "http://localhost:3000";
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  getBookings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/booked`);
  }

  getDrivers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/drivers`);
  }
}
