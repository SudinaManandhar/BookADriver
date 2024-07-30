import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../service/common-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent  implements OnInit {

  editProfileForm!: FormGroup;
  user: any={};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonServiceService,
    private location: Location
  ) { 
  }

  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.loadUserData();
  }

  loadUserData() {
    this.user = this.commonService.getUserDetails();
      this.editProfileForm.patchValue(this.user);
  }

  onSubmit(){
    if (this.editProfileForm.valid) {
      const updatedData = { ...this.user, ...this.editProfileForm.value };
      this.commonService.updateUserProfile(updatedData).subscribe(response => {
        console.log('Profile updated successfully', response);
        this.router.navigate(['/edit-profile']);
      });
    }
  }

  goBack(){
    this.location.back();
  }

  


  

}
