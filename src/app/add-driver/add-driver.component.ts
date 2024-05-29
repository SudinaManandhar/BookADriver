import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss'],
})
export class AddDriverComponent  implements OnInit {

  @Output() driverAdded = new EventEmitter<void>();
  @Output() formClosed = new EventEmitter<void>();

  driverForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.driverForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      rate: ['',Validators.required],
      availability: ['',Validators.required],
      type:['',Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.driverForm.valid) {
      const formData = { ...this.driverForm.value, isBooked: false };
      this.http.post('http://localhost:3000/drivers', formData).subscribe(() => {
        this.driverAdded.emit();
        this.onCancel();
      });
    }
  }

  onCancel() {
    this.formClosed.emit();
  }

}
