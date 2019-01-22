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
        state('default', style({ transform: 'translateY(0px)', opacity: .8 })),
        transition('void => *', [style({ opacity: 0, transform: 'translateY(100px)' }), animate('250ms')]),
        transition(
            'default => closing',
            animate('500ms', style({ opacity: 0, transform: 'translateY(100px)' })),
        ),
    ]),
};

export type ToastAnimationState = 'default' | 'closing';
