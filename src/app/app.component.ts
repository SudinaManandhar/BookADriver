import { Component } from '@angular/core';
import { CommonServiceService } from './service/common-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(public commonService: CommonServiceService) {}
}
