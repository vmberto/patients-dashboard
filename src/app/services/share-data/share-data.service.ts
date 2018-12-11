import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

    public loadingScreenEvent = new Subject<any>();

    constructor() {}

    public activateLoadingScreen(activate) {
      setTimeout(() => { this.loadingScreenEvent.next(activate); });
    }




}
