import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Category } from "../interfaces/category";
import { Observable } from "rxjs/Rx";
import { environment } from "../../environments/environment";

@Injectable()
export class CategoryService {
    root_url: string = environment.root_url;
    constructor(
        private http: Http
    ) {}

    getCategories(): Observable<Category[]> {
        return this.http.get(this.root_url + '/categories').map(
            (res: Response) => <Category[]>res.json()
        )
        .catch(this.handleError);
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