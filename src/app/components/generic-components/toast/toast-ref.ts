import { OverlayRef } from '@angular/cdk/overlay';
import { ToastData } from './toast-config';
import { Subject } from 'rxjs';

export class ToastRef {

  public dataChange = new Subject<any>();

  constructor(private readonly overlay: OverlayRef) { }

  close() {
    this.overlay.dispose();
  }

  changeData(data: ToastData) {
    this.dataChange.next(data);
  }

}
