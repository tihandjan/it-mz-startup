import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class AdminAuthService {
    userSignedIn$:Subject<boolean> = new Subject();

    constructor(
        private auth: Angular2TokenService,
        router: Router
    ) {
        this.auth.init(environment.base_url);
        this.userSignedIn$.next(this.auth.userSignedIn());
    }

    adminLogIn(signInData: {email: string, password: string, userType: string}): Observable<Response> {
        return this.auth.signIn(signInData).map(
            res => {
                this.userSignedIn$.next(true);
                return res;
            }
        )
    }

    adminLogOut(): Observable<Response> {
        return this.auth.signOut().map(
            res => {
                this.userSignedIn$.next(false);
                return res;
            }
        )
    }

    isAdmin(): boolean {
        return (this.auth.currentUserType == 'ADMIN' && this.auth.userSignedIn()) ? true : false
    }
}