import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AdminAuthService } from '../../services/admin-auth';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: boolean = false;
  constructor(
    private authAdmin: AdminAuthService,
    private auth: Angular2TokenService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'password': new FormControl('', Validators.required),
      'userType': new FormControl('ADMIN')
    })
  }

  ngOnInit() {
    if(this.auth.currentUserType == "ADMIN") {
      this.router.navigate(['/admin/dashboard'])
    }
  }

  logIn() {
    this.authAdmin.adminLogIn(this.loginForm.value).subscribe(
      res => {
          if(res.status == 200) {
            this.errors = false;
            console.log(res)
            // location.reload();
            this.router.navigate(['/'])
          }
      },
      err => {
          this.errors = true;
          console.log(err);
      }          
    )
  }

  logOut() {
    this.authAdmin.adminLogOut().subscribe(
      res => this.router.navigate(['/']),
      err => console.log(err)
    )
  }

}
