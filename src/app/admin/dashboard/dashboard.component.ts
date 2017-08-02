import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminAuthService } from '../../services/admin-auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../shared.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private auth: AdminAuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
