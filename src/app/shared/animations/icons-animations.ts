import { trigger, transition, style, animate } from "@angular/animations";

export const heartAnimation = trigger('heart', [
    transition(':enter', [
        animate('200ms ease-out', style({
            transform: 'scale(1.2)'
        }))
    ])
])