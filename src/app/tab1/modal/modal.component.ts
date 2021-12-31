import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'modal-component',
  templateUrl: 'modal.component.html',
})
export class ModalComponent {
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  @Input() title: string;

  constructor(public modalController: ModalController) {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}