import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AdminAuthService } from '../services/admin-auth';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private auth: AdminAuthService,
        private router: Router
    ) { }

    canActivate() {
        if(this.auth.userSignedIn$){
            this.router.navigate(['/admin/dashboard']);            
            return true;
        }else{           
            this.router.navigate(['/admin/login']);
            return false;
        }
    }
}