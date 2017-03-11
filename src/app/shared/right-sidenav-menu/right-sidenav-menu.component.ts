import { Component, OnInit, Renderer, ElementRef } from '@angular/core';

@Component({
  selector: 'app-right-sidenav-menu',
  templateUrl: './right-sidenav-menu.component.html',
  styleUrls: ['./right-sidenav-menu.component.scss']
})
export class RightSidenavMenuComponent implements OnInit {

  constructor(
    private el: ElementRef, 
    private render: Renderer
  ) { }

  ngOnInit() {
  }

}
