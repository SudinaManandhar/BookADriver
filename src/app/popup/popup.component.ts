import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewServiceService } from '../service/new-service.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {

  @Input() itemId: number | null = null;
  @Output() modalClosed = new EventEmitter<boolean>();

  constructor(
    private modalController: ModalController,
    private newService: NewServiceService
  ) {}

  onDelete() {
    if (this.itemId) {
      this.newService.deleteItem(this.itemId).then(() => {
        this.dismissModal(true);
      });
    } else {
      console.error('Item ID is undefined or null.');
    }
  }

  onCancel() {
    this.dismissModal(true);
  }

  dismissModal(isDeleted: boolean) {
    this.modalController.dismiss();
    this.modalClosed.emit(isDeleted);
  }

}
