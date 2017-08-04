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
  state('0', style({

  })),
  state('1', style({

  })),
  transition('void => 1', [
    style({
      left: '-500px',
      opacity: 0
    }),
    animate(300)
  ]),
  transition('void => 2', [
    style({
      left: '500px',
      opacity: 0
    }),
    animate(300)
  ])
])