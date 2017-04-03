import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { UserAuthService } from '../../services/user-auth';
import { Angular2TokenService } from 'angular2-token';
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
  constructor(
    private userAuth: UserAuthService,
    private _auth: Angular2TokenService
  ) {
    this.userRegForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'password': new FormControl('', Validators.required),
      'passwordConfirmation': new FormControl('', [Validators.required]),
      'userType': new FormControl('USER')
    });
    this.userSignInForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'password': new FormControl('', Validators.required),
      'userType': new FormControl('USER')
    })
  }

  ngOnInit() {}

  toggleMenu() {
    this.state = this.state === 'inactive' ? 'active' : 'inactive';
  }

  userRegistration() {
    this.userAuth.userRegistration(this.userRegForm.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  userSignIn() {
    this.userAuth.userLogIn(this.userSignInForm.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  logOut() {
    this.userAuth.userLogOut().subscribe(
      res => {
        console.log(res); 
      } ,
      err => console.log(err)
    )
  }

  toggleForm() {
    this.registration = !this.registration;
  }

}
