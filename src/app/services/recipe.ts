import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import { environment } from '../../environments/environment';
import { Recipe } from '../interfaces/recipe';
import { UserAuthService } from '../services/user-auth';

@Injectable()
export class RecipeService {
  baseUrl: any = environment.root_url
  constructor(
    private http: Http,
    private userAuth: UserAuthService
  ) { }

  getRecipies(): Observable<Recipe[]> {
    return this.http.get(this.baseUrl + '/recipes', this.userAuth.headers)
            .map(
              (response: Response) => <Recipe[]>response.json()
            )
            .catch(this.handleError);
  }

  getRecipe(slug: string): Observable<Recipe> {
    return this.http.get(this.baseUrl + '/recipes/' + slug, this.userAuth.headers).map(
      (res: Response) => <Recipe>res.json()
    )
    .catch(this.handleError)
  }

  getRecipesByCondition(category_id): Observable<Recipe[]> {
    let params: URLSearchParams = new URLSearchParams();
    let headers;
    params.set('category_id', category_id)
    headers = this.userAuth.headers.params = params;
    return this.http.get(this.baseUrl + '/recipes/by_condition', params)
      .map(
        (res: Response) => <Recipe[]>res.json()
      )
      .catch(this.handleError)
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post(this.baseUrl + '/recipes', JSON.stringify(recipe), this.userAuth.headers.params).map(
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
