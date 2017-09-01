import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { UserAuthService } from '../services/user-auth';

import { Comment } from "../interfaces/comment";
import { environment } from "../../environments/environment";

@Injectable()
export class CommentService {
    url = environment.root_url
    constructor(
        private http: Http,
        private userAuth: UserAuthService
    ) {}

    getComments(commentable_type: string, commentable_id: number): Observable<Comment[]> {
        return this.http.get(this.url + '/' + commentable_type + '/' + commentable_id + '/comments', this.userAuth.headers).map(
            res => <Comment[]>res.json()
        )
        .catch(this.handleError)
    }

    createComment(comment: Comment, commentable_type: string, commentable_id: number): Observable<Comment> {
        
        return this.http.post(this.url + '/' + commentable_type + '/' + commentable_id + '/comments', JSON.stringify(comment), this.userAuth.headers).map(
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