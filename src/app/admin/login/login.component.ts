import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'password': new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    if(this.auth.userSignedIn$) {
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
