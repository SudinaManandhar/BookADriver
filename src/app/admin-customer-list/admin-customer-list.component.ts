import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { Observable,forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../service/common-service.service';

@Component({
  selector: 'app-admin-customer-list',
  templateUrl: './admin-customer-list.component.html',
  styleUrls: ['./admin-customer-list.component.scss'],
})
export class AdminCustomerListComponent  implements OnInit {
  users: any[] = [];
  customerIdToDelete: string | null = null;
  showConfirmation: boolean = false;

  private customersUrl = 'http://localhost:3000/customers';
  private bookingsUrl = 'http://localhost:3000/bookings';
  private driversUrl = 'http://localhost:3000/drivers';

  constructor(private http:HttpClient, private commonService: CommonServiceService, private location: Location) { }

  ngOnInit() {
    this.loadDrivers();
  }

  loadDrivers() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(data => {
      this.users = data.filter(user => user.role === 'user');
      });
    }

  // getBookingByCustomerId(customerId: string): Observable<any[]>{
  //   const params = new HttpParams.set('id', customerId);
  //   return this.http.get<any[]>(this.bookingsUrl, { params });
  // }

  deletePopup(userId: string){
    this.customerIdToDelete = userId;
    this.showConfirmation = true;
  }

  deleteCustomer(){
    if (this.customerIdToDelete) {
      this.commonService.deleteCustomerAndRelatedData(this.customerIdToDelete).subscribe(() => {
        this.users = this.users.filter(customer => customer.id !== this.customerIdToDelete);
        this.closeConfirmation();
      });
    }
  }

  closeConfirmation(){
    this.showConfirmation = false;
    this.customerIdToDelete = null;
  }

  goBack(): void {
    this.location.back();
  }

}
