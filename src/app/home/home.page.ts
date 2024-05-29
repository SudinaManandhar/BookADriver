import { Component } from '@angular/core';
import { CommonServiceService } from '../service/common-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public commonService: CommonServiceService) {}

  ngOnInit(){
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if(isLoggedIn && !this.commonService.isLoggedIn){
      localStorage.setItem("isLoggedIn","false")
    }
  }

}
