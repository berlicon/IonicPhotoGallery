import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Device } from '@capacitor/device';
import { AccelListenerEvent, Motion } from '@capacitor/motion';
import { PluginListenerHandle } from '@capacitor/core';

interface CatFact {
  length: number;
  fact: string;
}

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  catFact = 'no cat';
  info = 'no info';

  accelHandler: PluginListenerHandle;
  event: AccelListenerEvent;
  acc = 'no acc';

  constructor(private menu: MenuController, 
    private http: HttpClient) {}

  getData() {
    this.getCatFact().subscribe(
      {
        next: (value: CatFact) => { this.catFact = value.fact; },
        error: (err: any) => { this.catFact = `Error: ${err}`; },
        complete: () => { console.log('complete'); },
      }
    );
  }

  getCatFact(): Observable<CatFact> {
    const url = 'https://catfact.ninja/fact?max_length=1000';
    return this.http.get<CatFact>(url)
      .pipe(
        tap(_ => console.log('fetched fact')),
      );
  }
  
  async hapticsVibrate() {
    await Haptics.vibrate();
  }
  
  async hapticsImpact() {
    await Haptics.impact({ style: ImpactStyle.Medium });
  }
  
  async logDeviceInfo() {
    this.info = '...' + new Date().toString();
    let x = await Device.getInfo()
    this.info = x.toString() + ` ${x.model} ${x.osVersion} ${x.name}`;
  }
  
  async logBatteryInfo() {
    this.info = '***' + new Date().toString();
    let x = await Device.getBatteryInfo()
    this.info = x.toString() + ` ${x.batteryLevel} ${x.isCharging}`;
  }
  
  async logAccel() {
    try {
      //await DeviceMotionEvent.requestPermission();
    } catch (e) {
      // Handle error
      return;
    }
  
    // Once the user approves, can start listening:
    this.accelHandler = await Motion.addListener('accel', event => {
      console.log('Device motion event:', event);
      this.acc = event.toString() + ` ${event.acceleration.x} ${event.acceleration.y}`;
    });
  }
    
  async stopAcceleration() {
    if (this.accelHandler) {
      this.accelHandler.remove();
    }
  }
    
  async removeListeners() {
    Motion.removeAllListeners();
  }
}