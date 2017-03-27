import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Observable, Subject } from 'rxjs/Rx';
import { Response } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class UserAuthService {
    userSignedIn$: Subject<boolean> = new Subject;
    constructor(
        private auth: Angular2TokenService
    ) {
        this.auth.init(environment.base_url);
        this.userSignedIn$.next(this.auth.userSignedIn());
    }

    userRegistration(userData: {email: string, password: string, passwordConfirmation: string, userType: string}): Observable<Response> {
        return this.auth.registerAccount(userData).map(
            res => {
                this.userSignedIn$.next(true);
                return res;
            }
        )
    }

    userLogIn(userData: {email: string, password: string, userType: string}): Observable<Response> {
        return this.auth.signIn(userData).map(
            res => {
                this.userSignedIn$.next(true);
                return res;
            }
        )
    }

    userLogOut(): Observable<Response> {
        return this.auth.signOut().map(
            res => {
                this.userSignedIn$.next(false);
                return res;
            }
        )
    }
}