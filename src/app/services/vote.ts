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
        return this.http.post(this.url + '/' + votable_type + '/' + votable_id + '/votes', JSON.stringify({}), this.userAuth.headers).map(
            (res) => res.json()
        )
    }
}