import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserAuthService } from '../services/user-auth';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: UserAuthService
    ) { }

    canActivate() {
        if(this.auth.isUserAdmin()){  
            return true;
        }else{           
            this.router.navigate(['/admin/login']); 
            return false;
        }
    }
}