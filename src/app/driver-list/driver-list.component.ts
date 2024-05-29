import { Component, OnInit } from '@angular/core';
import { DriverService } from '../driver.service';
import { NewServiceService } from '../service/new-service.service';
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

  constructor(private driverService: DriverService, private newService: NewServiceService, private location: Location, private http: HttpClient) { }

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
