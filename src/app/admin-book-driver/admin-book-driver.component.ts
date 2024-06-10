import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-book-driver',
  templateUrl: './admin-book-driver.component.html',
  styleUrls: ['./admin-book-driver.component.scss'],
})
export class AdminBookDriverComponent  implements OnInit {

  @Output() bookingAdded = new EventEmitter<void>();
  @Output() formClosed = new EventEmitter<void>();

  bookingForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.bookingForm.valid) {
      const formData = { ...this.bookingForm.value, role:'user' };
      this.http.post('http://localhost:3000/booked', formData).subscribe(() => {
        this.bookingAdded.emit();
        this.onCancel();
      });
    }
  }

  onCancel() {
    this.formClosed.emit();
  }
}
