import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, PickerColumnOption } from '@ionic/angular';
import { IonAccordionGroup } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { PickerController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';
import { LoadingController } from '@ionic/angular';
import { IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';
import { ToastController } from '@ionic/angular';

interface User {
  id: number;
  first: string;
  last: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonAccordionGroup, { static: true }) accordionGroup: IonAccordionGroup;
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  badgeNumber = 98;
  maxBreadcrumbs = 4;
  public form = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];

  dateValue = '';
  dateValue2 = '';

  pickingOptions = {
    name: "animal",
    options: [
      { text: "Dog", value: "dog" },
      { text: "Cat", value: "cat" },
      { text: "Bird", value: "bird" },
    ],
  };
  
  picked: {
    animal: {
      text: string,
      value: string
    },
  };

  counter = 0;

  items = [{
    'text': 'Item 1',
    'src': 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'
  }, {
    'text': 'Item 2',
    'src': 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'
  }, {
    'text': 'Item 3',
    'src': 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'
    //'src': '/path/to/external/file.png'
  }];

  showModal1 = false;
  showModal2 = false;
  showModal3 = false;
  showModal4 = false;

  enableBackdropDismiss = false;
  showBackdrop = false;
  shouldPropagate = false;

  showPopover1 = false;
  showPopover2 = false;

  pepperoni = false;
  sausage = true;
  mushrooms = false;

  data: any;
  item: any;

  users: User[] = [
    {
      id: 1,
      first: 'Alice',
      last: 'Smith',
    },
    {
      id: 2,
      first: 'Bob',
      last: 'Davis',
    },
    {
      id: 3,
      first: 'Charlie',
      last: 'Rosenburg',
    }
  ];

  customAlertOptions: any = {
    header: 'Pizza Toppings',
    subHeader: 'Select your toppings',
    message: '$1.00 per topping',
    translucent: true
  };

  customPopoverOptions: any = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };

  customActionSheetOptions: any = {
    header: 'Colors',
    subHeader: 'Select your favorite color'
  };

  // Optional parameters to pass to the swiper instance.
  // See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(
    public actionSheetController: ActionSheetController, 
    public alertController: AlertController,
    public popoverController: PopoverController,
    public pickerController: PickerController,
    private menu: MenuController,
    public routerOutlet: IonRouterOutlet,
    public modalController: ModalController,
    public loadingController: LoadingController,
    public toastController: ToastController
    ) {}

  async presentActionSheet() {
    //debugger;
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        id: 'delete-button',
        data: {
          type: 'delete'
        },
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        role: 'selected',
        data: 10,
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        data: 'Data value',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const x = await actionSheet.onDidDismiss();
    //debugger;
    const { role, data } = x;
    console.log('onDidDismiss resolved with role and data', role, data);

    //data - not supported now
  }

  favorite(item) {
    console.log(item);
  }

  share(item) {
    console.log(item);
  }

  unread(item) {
    console.log(item);
  }

  logAccordionValue() {
    console.log(this.accordionGroup.value);
  }
  
  closeAccordion() {
    this.accordionGroup.value = undefined;
  }  

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Prompt!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        // multiline input.
        {
          name: 'paragraph',
          id: 'paragraph',
          type: 'textarea',
          placeholder: 'Placeholder 3'
        },
        {
          name: 'name3',
          value: 'http://ionicframework.com',
          type: 'url',
          placeholder: 'Favorite site ever'
        },
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10
        },
        {
          name: 'name7',
          type: 'number'
        },
        {
          name: 'name8',
          type: 'password',
          placeholder: 'Advanced Attributes',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 4,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Radio',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Radio 1',
          value: 'value1',
          handler: () => {
            console.log('Radio 1 selected');
          },
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Radio 2',
          value: 'value2',
          handler: () => {
            console.log('Radio 2 selected');
          }
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Radio 3',
          value: 'value3',
          handler: () => {
            console.log('Radio 3 selected');
          }
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Radio 4',
          value: 'value4',
          handler: () => {
            console.log('Radio 4 selected');
          }
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Radio 5',
          value: 'value5',
          handler: () => {
            console.log('Radio 5 selected');
          }
        },
        {
          name: 'radio6',
          type: 'radio',
          label: 'Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 ',
          value: 'value6',
          handler: () => {
            console.log('Radio 6 selected');
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertCheckbox() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Checkbox',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'Checkbox 1',
          value: 'value1',
          handler: () => {
            console.log('Checkbox 1 selected');
          },
          checked: true
        },

        {
          name: 'checkbox2',
          type: 'checkbox',
          label: 'Checkbox 2',
          value: 'value2',
          handler: () => {
            console.log('Checkbox 2 selected');
          }
        },

        {
          name: 'checkbox3',
          type: 'checkbox',
          label: 'Checkbox 3',
          value: 'value3',
          handler: () => {
            console.log('Checkbox 3 selected');
          }
        },

        {
          name: 'checkbox4',
          type: 'checkbox',
          label: 'Checkbox 4',
          value: 'value4',
          handler: () => {
            console.log('Checkbox 4 selected');
          }
        },

        {
          name: 'checkbox5',
          type: 'checkbox',
          label: 'Checkbox 5',
          value: 'value5',
          handler: () => {
            console.log('Checkbox 5 selected');
          }
        },

        {
          name: 'checkbox6',
          type: 'checkbox',
          label: 'Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6',
          value: 'value6',
          handler: () => {
            console.log('Checkbox 6 selected');
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }  

  expandBreadcrumbs() {
    this.maxBreadcrumbs = undefined;
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: {
        collapsedBreadcrumbs: ev.detail.collapsedBreadcrumbs
      },
      event: ev
    });
    await popover.present();
  }

  onButtonBlur() {
    console.log('onButtonBlur');  //сработал только после алерта
  }

  onButtonFocus() {
    console.log('onButtonFocus'); //сработало только после клика
  }

  onButtonClick() {
    console.log('onButtonClick'); //работает ОК
    //alert('onButtonClick');
  }

  confirm() {
    this.datetime.confirm();
  }
  
  reset() {
    this.datetime.reset();
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }  

  async openPicker() {
    let columns = [
      {
        name: 'Euro',
        cssClass: 'euro-class',
        options: []
      },
      {
        name: 'Komma',
        cssClass: 'komma-class',
        options: []
      },
      {
        name: 'Cent',
        cssClass: 'cent-class',
        options: []
      },
    ];

    for (let euroCounter = 0; euroCounter < 100; euroCounter++) columns[0].options.push({
      text: euroCounter.toString(),
      value: euroCounter
    });

    columns[1].options.push({
      text: ',',
      value: undefined
    });

    for (let centCounter = 0; centCounter < 100; centCounter++) columns[2].options.push({
      text: centCounter<10?'0'+centCounter.toString():centCounter.toString(),
      value: centCounter
    });

    const picker = await this.pickerController.create({
      columns: [this.pickingOptions],
      //columns: columns,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Confirm",
          handler: (value) => {
            //debugger;
            this.picked = value;
            console.log(`Got Value ${JSON.stringify(value)}`);
          },
        },
      ],
    });
    await picker.present();
  }
  
  onFabClick(name: string) {
    console.log(name);
    alert(name);
  }

  loadData(event) {
    setTimeout(() => {
      this.counter += 300;
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.counter > 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  untoggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    this.counter = 0;
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  showModalWindow1() {
    this.showModal1 = !this.showModal1;
  }

  showModalWindow2() {
    this.showModal2 = !this.showModal2;
  }

  showModalWindow3() {
    this.showModal3 = !this.showModal3;
  }

  showModalWindow4() {
    this.showModal4 = !this.showModal4;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });

    //return await modal.present();
    modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
  }

  showHideBackdrop() {
    this.enableBackdropDismiss = !this.enableBackdropDismiss;
    this.showBackdrop = !this.showBackdrop;
    this.shouldPropagate = !this.shouldPropagate;
    }

  showHidePopover1() {
    this.showPopover1 = !this.showPopover1;
  }

  showHidePopover2() {
    this.showPopover2 = !this.showPopover2;
    }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.data = {
        'heading': 'Normal text',
        'para1': 'Lorem ipsum dolor sit amet, consectetur',
        'para2': 'adipiscing elit.'
      };
    }, 5000);
  }

  public customFormatter(value: number) {
    return `${value}%`
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  } 
  
  doReorder(ev: CustomEvent<ItemReorderEventDetail> | any) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  compareWith(o1: User, o2: User) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compareWith2(o1: User, o2: User | User[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((u: User) => u.id === o1.id);
    }

    return o1.id === o2.id;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      icon: 'information-circle',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
