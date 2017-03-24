import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminAuthService } from '../../services/admin-auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData = {
    email: '',
    password: ''
  }
  constructor(
    private auth: AdminAuthService,
    private router: Router
  ) { }

  ngOnInit() {}

  logIn() {
    this.auth.adminLogIn(this.userData).subscribe(
      res => {
        this.router.navigate(['/admin/dashboard']);            
      },
      err => {
        console.log(err)
      }
    )
  }

}
