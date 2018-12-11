import { interval } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public pop: boolean;
  public animationDisappear: boolean;

  constructor() { }

  ngOnInit() {
    this.pop = true;
    interval(5000)
      .subscribe(() => {
        this.disappearAnimation();
      })
  }

  disappearAnimation() {
    this.animationDisappear = true;
    interval(1000)
      .subscribe(() =>{
        this.notificationErased();
      })

  }

  notificationErased() {
    this.pop = false;
  }



}
