import { errorComparator } from 'tslint/lib/test/lintError';
import { HeaderComponent } from '../shared/header/header.component';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import { environment } from '../../environments/environment';
import { Recipe } from '../interfaces/recipe';
import { UserAuthService } from '../services/user-auth';
import { AdminAuthService } from '../services/admin-auth';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class RecipeService {
  baseUrl: any = environment.root_url
  constructor(
    private http: Http,
    private _tokenService: Angular2TokenService,
    private userAuth: UserAuthService,
    private adminAuth: AdminAuthService
  ) { }

  getRecipies(): Observable<Recipe[]> {
    return this.http.get(this.baseUrl + '/recipes')
            .map(
              (response: Response) => <Recipe[]>response.json()
            )
            .catch(this.handleError);
  }

  createRecipe(recipe: Recipe, user_type: string): Observable<Recipe> {
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
    return this.http.post(this.baseUrl + '/recipes', JSON.stringify(recipe), requestOptions).map(
      (response: Response) => response.json()
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
