import { ForEachCommentCallback } from 'tslint/lib';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { UserAuthService } from '../services/user-auth';
import { AdminAuthService } from '../services/admin-auth';

import { Comment } from "../interfaces/comment";
import { environment } from "../../environments/environment";

@Injectable()
export class CommentService {
    url = environment.root_url
    constructor(
        private http: Http,
        private userAuth: UserAuthService,
        private adminAuth: AdminAuthService,
    ) {}

    getComments(commentable_type: string, commentable_id: number): Observable<Comment[]> {
        return this.http.get(this.url + '/' + commentable_type + '/' + commentable_id + '/comments').map(
            res => <Comment[]>res.json()
        )
        .catch(this.handleError)
    }

    createComment(comment: Comment, user_type: string, commentable_type: string, commentable_id: number): Observable<Comment> {
        let tokens;
        if (user_type == 'ADMIN')
            tokens = this.adminAuth.tokens;
        else if (user_type == 'USER')
            tokens = this.userAuth.tokens;
        let headers = new Headers();
        headers.append('Accept','application/json'); 
        headers.append('access-token', tokens.accessToken); 
        headers.append('client', tokens.client); 
        headers.append('uid', tokens.uid); 
        headers.append('expiry', tokens.expiry); 
        headers.append('token-type', tokens.tokenType);
        headers.append('content-type', 'application/json');
        let requestOptions = new RequestOptions({headers: headers});
        return this.http.post(this.url + '/' + commentable_type + '/' + commentable_id + '/comments', JSON.stringify(comment), requestOptions).map(
            (res: Response) => <Comment>res.json()
        ) 
    }

    private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
        return Observable.throw(errMsg);
    }
}