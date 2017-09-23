import { trigger, style, transition, animate, keyframes } from "@angular/animations";

export const fadeInTrigger = trigger('showTrigger',[
    transition(':enter', [
        animate('550ms ease-out', keyframes([
            style({
                transform: 'translateX(-100%)',
                opacity: 0,
                offset: 0
            })
            ,style({
                transform: 'translateX(21%)',
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

export const slideElement = trigger('slideStateTrigger', [
    transition(':enter', [
        style({
            transform: 'translateX(-100%)',
            opacity: 0
        }),
        animate('350ms ease-out')
    ]),
    transition(':leave', [
        animate('350ms ease-out', style({
            opacity: 0,
            transform: 'translateX(-100%)',
        }))
    ])
])