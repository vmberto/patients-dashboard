import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import { ToastData, TOAST_CONFIG_TOKEN, ToastConfig } from './toast-config';
import { ToastRef } from './toast-ref';
import { toastAnimations, ToastAnimationState } from './toast-animation';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['toast.component.css'],
  animations: [toastAnimations.fadeToast],
})
export class ToastComponent implements OnInit, OnDestroy {
  animationState: ToastAnimationState = 'default';
  changedRecently: boolean = false;

  private intervalId: any;

  constructor(
    public data: ToastData,
    readonly ref: ToastRef,
    private router: Router,
    @Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig) {

  }

  ngOnInit() {

    this.intervalId = setTimeout(() => this.animationState = 'closing', 4000);

    this.router.events.subscribe((event: Event) => {
      if (!this.changedRecently && event instanceof NavigationEnd) this.forceClose();
    });

    this.ref.dataChange.subscribe(changes => {
        this.changedRecently = true;
        this.animationState = 'default';
        clearTimeout(this.intervalId);
        this.data = changes;
        this.intervalId = setTimeout(() => {
          this.animationState = 'closing'
          this.changedRecently = false;
        }, 3500);
    });

  }

  ngOnDestroy() {
    clearTimeout(this.intervalId);
  }

  close() {
    this.ref.close();
  }

  forceClose() {
    clearTimeout(this.intervalId);
    this.animationState = 'closing';
  }

  onFadeFinished(event: AnimationEvent) {
    const { toState } = event;
    const isFadeOut = (toState as ToastAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close();
    }
  }
}
