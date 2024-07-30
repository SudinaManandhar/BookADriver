import { Component, OnInit } from '@angular/core';
import { DriverService } from '../driver.service';
import { NewServiceService } from '../service/new-service.service';
import { CommonServiceService } from '../service/common-service.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss'],
})
export class DriverListComponent implements OnInit {

  drivers: any[] = [];
  
  showForm = false;
  showOption = false;

  searchTerm: string = '';
  sortColumn: string = 'name';
  sortDirection: string = 'asc';

  constructor(private driverService: DriverService, public commonService: CommonServiceService, private newService: NewServiceService, private location: Location, private http: HttpClient) { }

  ngOnInit(): void {
      this.loadDrivers();
  }

  openDeletePopup(driverId: number) {
    this.newService.showPopup(driverId);
  }

  goBack(): void {
    this.location.back();
  }

  loadDrivers() {
    this.http.get<any[]>('http://localhost:3000/drivers').subscribe(data => {
      this.drivers = data;
    });
  }

  
  get filteredDrivers() {
    
    const filtered = this.drivers.filter(driver => 
      driver.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      driver.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      driver.contact.toLowerCase().includes(this.searchTerm.toLowerCase()) 
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

  onAddDriver() {
    this.showForm = true;
  }

  onDriverAdded() {
    this.loadDrivers();
  }

  onFormClosed() {
    this.showForm = false;
  }

  onBookDriver(){
    this.showOption = true;
  }

  onOptionClosed(){
    this.showOption = false;
  }

  onDriverDeleted(){
    this.loadDrivers();
  }

}
