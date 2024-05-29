import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { PopupComponent } from '../popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class NewServiceService {

  // private itemIdToDelete: number | null = null;
  private apiUrl = 'http://localhost:3000/drivers'; 

  constructor(
    private modalController: ModalController,
    private http: HttpClient
  ) {}

  async showPopup(itemId: number) {
    // this.itemIdToDelete = itemId;
    const modal = await this.modalController.create({
      component: PopupComponent,
      componentProps: {
        itemId: itemId
      }
    });
    await modal.present().then(() => modal.onDidDismiss());
  }

  async deleteItem(itemId: number) {
    await this.http.delete(`${this.apiUrl}/${itemId}`).toPromise();
  }
}
