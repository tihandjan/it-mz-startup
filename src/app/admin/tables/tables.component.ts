import { Component, OnInit, HostBinding } from '@angular/core';

import { routerAnimation } from "../../shared/animations/router-animation";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss', '../shared.css'],
  animations: [
    routerAnimation
  ]
})
export class TablesComponent implements OnInit {
  @HostBinding('@routerState') routerAnimation = true

  constructor() { }

  ngOnInit() {
  }

}
