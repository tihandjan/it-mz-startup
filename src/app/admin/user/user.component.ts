import { Component, OnInit, HostBinding } from '@angular/core';

import { routerAnimation } from "../../shared/animations/router-animation";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss', '../shared.css'],
  animations: [
    routerAnimation
  ]
})
export class UserComponent implements OnInit {
  @HostBinding('@routerState') routerAnimation = true

  constructor() { }

  ngOnInit() {
  }

}
