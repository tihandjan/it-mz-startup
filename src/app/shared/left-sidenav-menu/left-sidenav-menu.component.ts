import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-sidenav-menu',
  templateUrl: './left-sidenav-menu.component.html',
  styleUrls: ['./left-sidenav-menu.component.scss']
})
export class LeftSidenavMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  open($event) {
    console.log($event)
  }

}
