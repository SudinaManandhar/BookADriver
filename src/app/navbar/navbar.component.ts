import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../service/common-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  constructor(public commonService: CommonServiceService, private router: Router) { 
    
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

  editProfile(){

  }

  onSelect(event: any){
    const selectedValue = event.detail.value;
    if(selectedValue === "logout"){
      this.logout();
    }
    else if(selectedValue === 'editProfile'){
      console.log(selectedValue);
      this.router.navigate(['/edit-profile']);
    }

    setTimeout(() => {
      (event.target as HTMLSelectElement).value = ''; // Clear the selection
    });
  }

}
