import { Component, OnInit, HostBinding } from '@angular/core';

import { routerAnimation } from "../../shared/animations/router-animation";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss', '../shared.css'],
  animations: [
    routerAnimation
  ]
})
export class NotificationsComponent implements OnInit {
  @HostBinding('@routerState') routerAnimation = true

  constructor() { }

  ngOnInit() {
  }

}
