import {
    Component, 
    OnInit,
    animate,
    style,
    state,
    trigger,
    transition
} from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { AdminAuthService } from '../services/admin-auth';
@Component({
    moduleId: module.id,
    selector: 'app-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.scss'],
    animations: [
        trigger('elementState', [
            state('active', style({
                left: '0'
            })),
            state('inactive', style({
                left: '-260px'
            })),
            transition('active <=> inactive', animate('200ms ease-out'))
        ])
    ]
})
export class AdminComponent implements OnInit {
    state: string = 'inactive'
    constructor(
        private router: Router,
        private auth: AdminAuthService
    ) { }

    ngOnInit() {
        this.router.navigate(['/admin/dashboard'])
    }

    openMenu() {
        this.state = this.state == 'inactive' ? 'active' : 'inactive';
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