import { trigger, animate, style, transition } from "@angular/animations";

export const routerAnimation = trigger('routerState', [
    transition(':enter',[
        style({
            opacity: 0
        }),
        animate(350)
    ])
])