import { Ingredient } from '../../interfaces/ingredient';
import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Subject } from "rxjs/Rx";

import { RecipeService } from "../../services/recipe";
import { VoteService } from "../../services/vote";
import { UserAuthService } from "../../services/user-auth";

import { Recipe } from "../../interfaces/recipe";

import { routerAnimation } from "../../shared/animations/router-animation";
import { heartAnimation } from "../../shared/animations/icons-animations";

@Component({
  selector: 'app-recipe-show',
  templateUrl: './recipe-show.component.html',
  styleUrls: ['./recipe-show.component.scss'],
  animations: [
    routerAnimation,
    heartAnimation
  ]
})
export class RecipeShowComponent implements OnInit, OnDestroy {
  @HostBinding('@routerState') routerAnimation = true;
  recipe;
  ngUnSubscribe: Subject<void> = new Subject<void>();
  user_signed_in: boolean;
  constructor(
    private recipeService: RecipeService,
    private router: ActivatedRoute,
    private voteService: VoteService,
    private auth: UserAuthService
  ) { }

  ngOnInit() {
    this.getRecipe();
    this.user_signed_in = this.auth.userSignedIn();
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
        this.recipe = res;
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

  upVote(): void {
    if(this.auth.userSignedIn())
      this.voteService.vote('recipes', this.recipe.id).subscribe(
        res => {
          this.recipe.likes = res;
          this.recipe.liked = true;
        },
        err => console.log(err)
      )
  }

  downVote(): void {
    if(this.auth.userSignedIn())
      this.voteService.vote('recipes', this.recipe.id).subscribe(
        res => {
          this.recipe.likes = res;
          this.recipe.liked = false;
        },
        err => console.log(err)
      )
  }

}
