import { Injectable, Injector, Inject } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { ToastComponent } from './toast.component';
import { ToastData, TOAST_CONFIG_TOKEN, ToastConfig } from './toast-config';
import { ToastRef } from './toast-ref';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private lastToast: ToastRef;

    constructor(
        private overlay: Overlay,
        private parentInjector: Injector,
        @Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig
    ) { }

    private getPositionStrategy() {
        return this.overlay.position()
            .global()
            .centerHorizontally()
            .bottom();
    }

    private getInjector(data: ToastData, toastRef: ToastRef, parentInjector: Injector) {
        const tokens = new WeakMap();

        tokens.set(ToastData, data);
        tokens.set(ToastRef, toastRef);

        return new PortalInjector(parentInjector, tokens);
    }

    show(data: ToastData) {
        const overlayElement = document.querySelector('.cdk-overlay-container');
        if (overlayElement && overlayElement.hasChildNodes()) {
            this.changeToastData(data);
            return;
        }

        const positionStrategy = this.getPositionStrategy();
        const overlayRef = this.overlay.create({ positionStrategy });

        const toastRef = new ToastRef(overlayRef);
        this.lastToast = toastRef;

        const injector = this.getInjector(data, toastRef, this.parentInjector);
        const toastPortal = new ComponentPortal(ToastComponent, null, injector);

        overlayRef.attach(toastPortal);

        return toastRef;
    }

    changeToastData(data: ToastData) {
        this.lastToast.changeData(data);
    }

}
