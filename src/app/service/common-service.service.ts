import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map,tap,switchMap  } from 'rxjs/operators';
import { Router } from '@angular/router';

interface Users{
  id: number,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})

export class CommonServiceService {
  
  isLoggedIn: boolean = false;
  public currentUser: any= null;
  
  private apiUrl="http://localhost:3000/users";
  private bookUrl = "http://localhost:3000/booked";
  private driverUrl = "http://localhost:3000/drivers";

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<Users[]>(this.apiUrl).pipe(
        map(users =>  users.find(u => u.email === email && u.password === password)),
        tap(u => this.currentUser = u),
        map(u => !!u)
        // this.isLoggedIn == !!user;
        // return !!user;  
        )
        
  };
  
  isAdmin():boolean{
    return this.currentUser?.role === 'admin';
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  isUser():boolean{
    console.log(this.currentUser);
    return this.currentUser?.role === 'user';
  }

  logout(): void {
    this.currentUser = null;
    this.router.navigateByUrl("/login");
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  deleteCustomer(id: string): Observable<void>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getUserDetails(){
    return this.currentUser;
  }

  getBookingsByCustomerId(customerId: string): Observable<any[]> {
    const params = new HttpParams().set('user.id', customerId);
    return this.http.get<any[]>(this.bookUrl, { params });
  }

  deleteBooking(bookingId: string): Observable<void> {
    return this.http.delete<void>(`${this.bookUrl}/${bookingId}`);
  }

  updateDriver(driver: any): Observable<any> {
    return this.http.put<any>(`${this.driverUrl}/${driver.id}`, driver);
  }

  deleteCustomerAndRelatedData(customerId: string): Observable<void> {
    return this.getBookingsByCustomerId(customerId).pipe(
      switchMap(bookings => {
        const deleteBookings$ = bookings.map(booking => this.deleteBooking(booking.id));
        const updateDrivers$ = bookings.map(booking => {
          const driver = { ...booking.driver, isBooked: false };
          console.log(driver);
          return this.updateDriver(driver);
        });

        return forkJoin([...deleteBookings$, ...updateDrivers$]);
      }),
      switchMap(() => this.deleteCustomer(customerId))
    );
  }

}
