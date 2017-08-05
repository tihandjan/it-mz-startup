import {
  state,
  style,
  trigger,
  animate,
  transition
 } from '@angular/core';
 
export const btnTriggerFilter = trigger('buttomState', [
      state('first', style({
        left: 0
      })),
      state('second', style({
        left: '132px'
      })),
      state('third', style({
        left: '270px'
      })),
      transition('first <=> second', animate('200ms ease-out')),
      transition('first <=> third', animate('200ms ease-out')),
      transition('second <=> third', animate('200ms ease-out'))
    ]);
export const showElements = trigger('showState', [
  transition(':enter', [
    style({
      transform: 'scale(0)',
      opacity: 0
    }),
    animate('350ms ease-out')
  ])
])