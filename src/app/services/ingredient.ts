import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs/Rx";
import { Ingredient } from "../interfaces/ingredient";
import { UserAuthService } from "../services/user-auth";

@Injectable()
export class IngredientService {
  url: string = environment.root_url;
  constructor(
    private http: Http,
    private userAuth: UserAuthService,
  ) { }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get(this.url + '/ingredients').map(
      (response: Response) => <Ingredient[]>response.json()
    )
    .catch(this.handleError)
  }

  createIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post(this.url + '/ingredients', JSON.stringify(ingredient), this.userAuth.headers).map(
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
