import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { AdminAuthService } from '../../services/admin-auth';

import { routerAnimation } from "../../shared/animations/router-animation";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../shared.css'],
  animations: [
    routerAnimation
  ]
})
export class DashboardComponent implements OnInit {
  @HostBinding('@routerState') routerAnimation = true

  constructor(
    private auth: AdminAuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
