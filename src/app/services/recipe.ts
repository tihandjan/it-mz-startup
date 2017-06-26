import { errorComparator } from 'tslint/lib/test/lintError';
import { HeaderComponent } from '../shared/header/header.component';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import { environment } from '../../environments/environment';
import { Recipe } from '../interfaces/recipe'

@Injectable()
export class RecipeService {
  baseUrl: any = environment.base_url.apiBase
  constructor(
    private http: Http
  ) { }

  getRecipies(): Observable<Recipe[]> {
    return this.http.get(this.baseUrl + '/recipies')
            .map(
              (response: Response) => <Recipe[]>response.json()
            )
            .catch(this.handleError);
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let requestOptions = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + '/recipe', JSON.stringify(recipe), requestOptions).map(
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
