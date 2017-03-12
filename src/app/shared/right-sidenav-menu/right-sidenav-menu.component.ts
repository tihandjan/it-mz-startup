import {
   Component, 
   OnInit,
   trigger,
   state,
   animate,
   style,
   transition
} from '@angular/core';

@Component({
  selector: 'app-right-sidenav-menu',
  templateUrl: './right-sidenav-menu.component.html',
  styleUrls: ['./right-sidenav-menu.component.scss'],
  animations: [
    trigger('elementState', [
      state('inactive', style({
        right: '-280px'
      })),
      state('active', style({
        right: 0
      })),
      transition('inactive <=> active', animate('300ms ease-out'))
    ])
  ]
})
export class RightSidenavMenuComponent implements OnInit {
  state: string = 'inactive';
  constructor() { }

  ngOnInit() {
  }

  toggleMenu() {
    this.state = this.state === 'inactive' ? 'active' : 'inactive';
  }


}
