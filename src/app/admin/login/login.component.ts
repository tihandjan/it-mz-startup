import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Angular2TokenService } from 'angular2-token';

import { AdminAuthService } from '../../services/admin-auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: boolean = false;
  constructor(
    private auth: AdminAuthService,
    private router: Router,
    private _generalAuth: Angular2TokenService
  ) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'password': new FormControl('', Validators.required),
      'userType': new FormControl('ADMIN')
    })
  }

  ngOnInit() {
    if(this._generalAuth.currentUserType == 'ADMIN' && this._generalAuth.userSignedIn()) {
      this.router.navigate(['/admin/dashboard'])
    }
  }

  logIn() {
    this.auth.adminLogIn(this.loginForm.value).subscribe(
      res => {
          if(res.status == 200) {
            this.errors = false;
            location.reload();
          }
      },
      err => {
          this.errors = true;
          console.log(err);
      }          
    )
  }

  logOut() {
    this.auth.adminLogOut().subscribe(
      res => this.router.navigate(['/']),
      err => console.log(err)
    )
  }

}
