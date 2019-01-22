import {
    AnimationTriggerMetadata,
    trigger,
    state,
    transition,
    style,
    animate,
} from '@angular/animations';

export const toastAnimations: { readonly fadeToast: AnimationTriggerMetadata; } = {
    fadeToast: trigger('fadeAnimation', [
        state('default', style({ transform: 'translateY(0px)', opacity: 1 })),
        transition('void => *', [style({ opacity: 0, transform: 'translateY(100px)' }), animate('450ms')]),
        transition(
            'default => closing',
            animate('700ms', style({ opacity: 0, transform: 'translateY(100px)' })),
        ),
    ]),
};

export type ToastAnimationState = 'default' | 'closing';
