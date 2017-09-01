import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { UserAuthService } from '../../services/user-auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-right-sidenav-menu',
  templateUrl: './right-sidenav-menu.component.html',
  styleUrls: ['./right-sidenav-menu.component.scss'],
  animations: [
    trigger('elementState', [
      state('inactive', style({
        right: '-280px'
      })),
      state('active', style({
        right: 0
      })),
      transition('inactive <=> active', animate('300ms ease-out'))
    ])
  ]
})
export class RightSidenavMenuComponent implements OnInit {
  state: string = 'inactive';
  userRegForm: FormGroup;
  userSignInForm: FormGroup;
  registration: boolean = false;
  regErrors: any;
  loginErrors: any;
  user_signed_in: boolean;
  constructor(
    private userAuth: UserAuthService
  ) {
    this.userRegForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'password': new FormControl('', Validators.required),
      'passwordConfirmation': new FormControl('', [Validators.required])
    });
    this.userSignInForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'password': new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    this.user_signed_in = this.userAuth.userSignedIn()
  }

  toggleMenu() {
    this.state = this.state === 'inactive' ? 'active' : 'inactive';
  }

  userRegistration() {
    this.userAuth.userRegistration(this.userRegForm.value).subscribe(
      res => {
        this.user_signed_in = this.userAuth.userSignedIn();
        location.reload();
      },
      err => {
        this.regErrors = err.json().errors;
        console.log(err);
      }
    )
  }

  userSignIn() {
    this.userAuth.userLogIn(this.userSignInForm.value).subscribe(
      res => {
        this.user_signed_in = this.userAuth.userSignedIn();
        location.reload();
      },
      err => {
        this.loginErrors = err.json().errors;        
        console.log(err);
      }
    )
  }

  logOut() {
    this.userAuth.userLogOut().subscribe(
      res => {
        this.user_signed_in = false
        location.reload();
      } ,
      err => console.log(err)
    )
  }

  toggleForm() {
    this.registration = !this.registration;
  }

}
