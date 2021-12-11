import { Component, OnInit } from '@angular/core';
import { Photo, PhotoService } from '../services/photo.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  date = 'Date';

  constructor(public photoService: PhotoService,
    public actionSheetController: ActionSheetController) { }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    //alert('photo');
    this.photoService.addNewToGallery();
  }

  onAlert() {
    alert(new Date().toString());
  }

  onDate() {
    this.date = new Date().toString();
  }

  public async showActionSheet(photo: Photo, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }
}
