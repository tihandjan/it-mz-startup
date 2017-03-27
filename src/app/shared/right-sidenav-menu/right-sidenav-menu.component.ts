import {
   Component, 
   OnInit,
   trigger,
   state,
   animate,
   style,
   transition
} from '@angular/core';
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
  userForm: FormGroup;
  constructor(
    private userAuth: UserAuthService,
    private _auth: Angular2TokenService
  ) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('')]),
      password: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required]),
      userType: new FormControl('USER')
    })
  }

  ngOnInit() {}

  toggleMenu() {
    this.state = this.state === 'inactive' ? 'active' : 'inactive';
  }

  userRegistration() {
    this.userAuth.userRegistration(this.userForm.value).subscribe(
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


}
