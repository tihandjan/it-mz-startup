import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Country } from "../interfaces/country";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CountryService {
    url = environment.root_url
    constructor(
        private http: Http
    ) {}

    getCountry(): Observable<Country[]> {
        return this.http.get(this.url + '/countries').map(
            (res: Response) => <Country[]>res.json()
        )
        .catch(this.handleError)
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