import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../service/common-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  constructor(public commonService: CommonServiceService) { 
    
  }

  ngOnInit() {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if(isLoggedIn && !this.commonService.isLoggedIn){
      localStorage.setItem("isLoggedIn","false")
    }
  }

  logout() {
    this.commonService.logout();
  }

}
