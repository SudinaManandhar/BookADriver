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
  searchTerm: string = '';
  sortColumn: string = 'name';
  sortDirection: string = 'asc';

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
      console.log(this.users);
      });
    }

  // getBookingByCustomerId(customerId: string): Observable<any[]>{
  //   const params = new HttpParams.set('id', customerId);
  //   return this.http.get<any[]>(this.bookingsUrl, { params });
  // }

  // Search Functionality

  get filteredUsers() {
    
    const filtered = this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
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
