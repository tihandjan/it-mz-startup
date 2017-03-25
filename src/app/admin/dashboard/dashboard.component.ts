import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminAuthService } from '../../services/admin-auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private auth: AdminAuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signOut() {
    this.auth.adminLogOut().subscribe(
      res => {
        this.router.navigate(['/']);
      },
      err => console.log(err)
    )
  }
}
