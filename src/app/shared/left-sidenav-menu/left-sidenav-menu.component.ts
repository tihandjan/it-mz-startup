import {
   Component, OnInit, 
   style,
   state,
   trigger,
   animate,
   transition
} from '@angular/core';

@Component({
  selector: 'app-left-sidenav-menu',
  templateUrl: './left-sidenav-menu.component.html',
  styleUrls: ['./left-sidenav-menu.component.scss'],
  animations: [
    trigger('elementState', [
      state('inactive', style({
        left: '-190px'
      })),
      state('active', style({
        left: '0'
      })),
      transition('active <=> inactive', animate('300ms ease-out'))
    ])
  ]
})
export class LeftSidenavMenuComponent implements OnInit {
  state: string = 'inactive';
  constructor() { }

  ngOnInit() {
  }

  openMenu() {
    this.state = this.state == 'inactive' ? 'active' : 'inactive';
  }

}
