import { InjectionToken, TemplateRef } from '@angular/core';

/**@TODO add an optional attribute that can be a function to be executed on click (like click and focus an required input) */
export class ToastData {
  type: ToastType;
  text?: string;
  template?: TemplateRef<any>;
  templateContext?: {};
}

export type ToastType = 'warning' | 'danger' | 'success';

export interface ToastConfig {
    position?: {
        top: number;
        right: number;
    };
    animation?: {
        fadeOut: number;
        fadeIn: number;
    };
}


export const TOAST_CONFIG_TOKEN = new InjectionToken('toast-config');
