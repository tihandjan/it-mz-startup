import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { UserAuthService } from "./user-auth";

import { environment } from "../../environments/environment";

@Injectable()
export class VoteService {
    url = environment.root_url;
    constructor(
        private http: Http,
        private userAuth: UserAuthService,
    ) {}

    vote(votable_type: string, votable_id: number) {
        let tokens = this.userAuth.tokens;
        let headers = new Headers();
        headers.append('Accept','application/json'); 
        headers.append('access-token', tokens.accessToken); 
        headers.append('client', tokens.client); 
        headers.append('uid', tokens.uid); 
        headers.append('expiry', tokens.expiry); 
        headers.append('token-type', tokens.tokenType);
        headers.append('content-type', 'application/json');
        let requestOptions = new RequestOptions({headers: headers});
        
        return this.http.post(this.url + '/' + votable_type + '/' + votable_id + '/votes', JSON.stringify({}), requestOptions).map(
            (res) => res.json()
        )
    }
}