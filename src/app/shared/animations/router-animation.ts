import { trigger, animate, style, transition, group, keyframes } from "@angular/animations";

export const routerAnimation = trigger('routerState', [
    transition(':enter',[
        style({
            opacity: 0,
            transform: 'translateY(30px)'
        }),
        group([
            animate('400ms ease-in-out', style({
                transform: 'translateY(0)'
            })),
            animate('600ms ease-in-out', keyframes([
                style({
                    opacity: 0
                }),
                style({
                    opacity: 1
                })
            ]))
        ])
    ])
])