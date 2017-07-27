import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs/Rx";
import { Ingredient } from "../interfaces/ingredient";
import { AdminAuthService } from "../services/admin-auth";
import { UserAuthService } from "../services/user-auth";

@Injectable()
export class IngredientService {
  url: string = environment.root_url;
  constructor(
    private http: Http,
    private adminAuth: AdminAuthService,
    private userAuth: UserAuthService,
  ) { }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get(this.url + '/ingredients').map(
      (response: Response) => <Ingredient[]>response.json()
    )
    .catch(this.handleError)
  }

  createIngredient(ingredient: Ingredient, user_type: string): Observable<Ingredient> {
    let tokens;
    if (user_type == 'admin')
      tokens = this.adminAuth.tokens;
    else if (user_type == 'user')
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
    return this.http.post(this.url + '/ingredients', JSON.stringify(ingredient), requestOptions).map(
      (res: Response) => <Ingredient>res.json()
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
