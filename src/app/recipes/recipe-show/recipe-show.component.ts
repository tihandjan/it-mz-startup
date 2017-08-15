import { Ingredient } from '../../interfaces/ingredient';
import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Subject } from "rxjs/Rx";

import { RecipeService } from "../../services/recipe";
import { Recipe } from "../../interfaces/recipe";
import { CommentsComponent } from "../../shared/comments/comments.component";

import { routerAnimation } from "../../shared/animations/router-animation";

@Component({
  selector: 'app-recipe-show',
  templateUrl: './recipe-show.component.html',
  styleUrls: ['./recipe-show.component.scss'],
  animations: [
    routerAnimation
  ]
})
export class RecipeShowComponent implements OnInit, OnDestroy {
  @HostBinding('@routerState') routerAnimation = true;
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

  getIngredientData(id: number) {
    return this.recipe['recipes_ingredients'].find(
      ing => {
        return ing['ingredient_id'] == id
      }
    )
  }

  ingredientsWithImage(): Ingredient[] {
    return this.recipe['ingredients'].filter(
      ing => {
        return ing.image.url != null
      }
    )
  }

}
