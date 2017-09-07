import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Observable, Subject } from 'rxjs/Rx';
import { Response, Headers, RequestOptions } from '@angular/http';

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

    get headers() {
        let tokens;
        if(this.auth.currentAuthData)
            tokens = {
                accessToken: this.auth.currentAuthData['accessToken'],
                client: this.auth.currentAuthData['client'],
                uid: this.auth.currentAuthData['uid'],
                expiry: this.auth.currentAuthData['expiry'],
                tokenType: this.auth.currentAuthData['tokenType'],
            }
        else
            tokens = {
                accessToken: null,
                client: null,
                uid: null,
                expiry: null,
                tokenType: null,
            }
        let headers = new Headers();
        headers.append('Accept','application/json'); 
        headers.append('access-token', tokens.accessToken); 
        headers.append('client', tokens.client); 
        headers.append('uid', tokens.uid); 
        headers.append('expiry', tokens.expiry); 
        headers.append('token-type', tokens.tokenType);
        headers.append('content-type', 'application/json');
        let requestOptions = new RequestOptions({headers: headers});
        return requestOptions;
    }

    userSignedIn(): boolean {
        return this.auth.userSignedIn();
    }

    isUserAdmin(): boolean {
        return true;
    }
}