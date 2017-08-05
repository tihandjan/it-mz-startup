import { trigger, style, transition, animate } from "@angular/animations";

export const fadeInTrigger = trigger('showTrigger',[
    transition(':enter', [
        style({
            transform: 'scale(0)',
            opacity: 0
        }),
        animate('350ms ease-out')
    ])
])