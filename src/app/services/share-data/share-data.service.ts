import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

    public loadingScreenSubscriber = new Subject<any>();
    public patientChangesSubscriber = new Subject<any>();

    private patientData: any;

    constructor() {}

    public activateLoadingScreen(activate) {
      setTimeout(() => { this.loadingScreenSubscriber.next(activate); });
    }
    
    
    get patient() {
      return this.patientData;
    }

    set patient(patientData: any) {
      this.patientData = patientData;
    }

    public sendPatientChanges(changes) {
      this.patientChangesSubscriber.next(changes);
    }


}
