import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

  interface Driver {
    id: number;
    name: string;
    contact: string;
    address: string;
    isBooked: boolean;
  }
  
  @Injectable({
    providedIn: 'root'
  })

  export class DriverService {
    private apiUrl = 'http://localhost:3000/drivers';
  
    constructor(private http: HttpClient) { }
  
    getDrivers(): Observable<Driver[]> {
      return this.http.get<Driver[]>(this.apiUrl);
    }

    updateDriver(driver: Driver): Observable<Driver> {
      return this.http.put<Driver>(`${this.apiUrl}/${driver.id}`, driver);
    }

    getDriverById(id: number): Observable<Driver> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<Driver>(url);
    }

    getDriverByid(id: string): Observable<Driver> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<Driver>(url);
    }
  }

