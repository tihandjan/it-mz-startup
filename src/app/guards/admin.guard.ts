import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

import { AdminAuthService } from '../services/admin-auth';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private auth: Angular2TokenService,
        private router: Router,
        private adminAuth: AdminAuthService
    ) { }

    canActivate() {
        if(this.auth.userSignedIn()){  
            return true;
        }else{           
            this.router.navigate(['/admin/login']); 
            return false;
        }
    }
}