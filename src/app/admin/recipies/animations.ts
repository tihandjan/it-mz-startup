import { trigger, style, transition, animate, keyframes } from "@angular/animations";

export const fadeInTrigger = trigger('showTrigger',[
    transition(':enter', [
        animate('400ms ease-out', keyframes([
            style({
                transform: 'translateX(-100%)',
                opacity: 0,
                offset: 0
            })
            ,style({
                transform: 'translateX(15%)',
                opacity: 0.5,
                offset: 0.55
            })
            ,style({
                transform: 'translateX(0)',
                opacity: 1,
                offset: 1
            })
        ]))
    ])
])