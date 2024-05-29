import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonServiceService } from '../service/common-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  registerForm: FormGroup;

  name: string="";
  address: string="";
  phone:string="";
  email:string="";
  password:string="";
  constructor(private fb: FormBuilder, private commonService: CommonServiceService, private router:Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['',Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.commonService.addUser(this.registerForm.value).subscribe(
        response => {
          console.log('User added successfully', response);
          this.router.navigateByUrl("/login");
        },
        error => {
          console.error('Error adding user', error);
        }
      );
    }
  
  }
}
