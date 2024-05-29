import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../service/common-service.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

email: string = "";
password: string = "";

  constructor(public commonService: CommonServiceService, private router:Router) { }

  ngOnInit() {

    this.email ="";
    this.password = "";

  }

  // lets suppose login

  // submit(){
  //   console.log(this.username)
  //   console.log(this.password)

  //   if(this.password === "asdfgh"){
  //   this.commonService.isLoggedIn = true
  //   this.router.navigateByUrl("/home");
  //   localStorage.setItem("isLoggedIn","true")
  //   }else{
  //     alert("Wrong Credential");
  //     this.commonService.isLoggedIn = false
  //   }

    submit(): void {
      this.commonService.login(this.email, this.password).subscribe(
        success => {
          if (success) {
            console.log('Login successful');
            this.commonService.isLoggedIn = true;
            this.router.navigateByUrl("/home");
            localStorage.setItem("isLoggedIn","true");
            // Perform further actions on successful login
          } else {
            alert("Wrong Credential");
            this.commonService.isLoggedIn = false;
          }
        }
      );
    }
  }


