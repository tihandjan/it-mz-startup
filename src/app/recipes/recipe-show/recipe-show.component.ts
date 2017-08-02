import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Subject } from "rxjs/Rx";

import { RecipeService } from "../../services/recipe";
import { Recipe } from "../../interfaces/recipe";

@Component({
  selector: 'app-recipe-show',
  templateUrl: './recipe-show.component.html',
  styleUrls: ['./recipe-show.component.scss']
})
export class RecipeShowComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  ngUnSubscribe: Subject<void> = new Subject<void>();
  constructor(
    private recipeService: RecipeService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getRecipe();
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  getRecipe(): void {
    let request = this.router.params.flatMap(
      (params: Params) => this.recipeService.getRecipe(params['slug'])
    )
    request.takeUntil(this.ngUnSubscribe).subscribe(
      res => {
        this.recipe = res 
        console.log(res)
      },
      err => console.log(err)
    )
  }

}
