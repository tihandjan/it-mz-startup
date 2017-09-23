import { 
  Component, 
  OnInit,
  OnDestroy
 } from '@angular/core';
import { Subject } from "rxjs/Rx";

import { Recipe } from '../models/recipe';
import { Article } from '../models/article';

import { RecipeService } from "../services/recipe";
import { VoteService } from "../services/vote";
import { UserAuthService } from "../services/user-auth";
import { btnTriggerFilter, showElements } from "./animations";
import { heartAnimation } from "../shared/animations/icons-animations";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    btnTriggerFilter,
    showElements,
    heartAnimation
  ]
})
export class MainComponent implements OnInit, OnDestroy {
  buttomState: string = 'first';
  first_recipe_state: string = 'active';
  second_recipe_state: string = 'inactive';
  third_recipe_state: string = 'inactive';
  test_array: Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12];
  top_recipe;
  top_recipe_second_line;
  ngUnsabscribe: Subject<void> = new Subject<void>();
  recipes;
  user_signed_in: boolean;
  loading: boolean = true;
  constructor(
    private recipeService: RecipeService,
    private auth: UserAuthService,
    private voteService: VoteService
  ) { }

  ngOnInit() {
    this.getRecipes();
    this.user_signed_in = this.auth.userSignedIn();
  }

  ngOnDestroy() {
    this.ngUnsabscribe.next();
    this.ngUnsabscribe.complete();
  }


  getRecipes(): void {
    this.recipeService.getRecipies()
         .takeUntil(this.ngUnsabscribe)
         .subscribe(
           res => {
             this.top_recipe = res.slice(0, 2);
             this.top_recipe_second_line = res.slice(2, 5);
             this.recipes = res.slice(5, 13);
             this.loading = false;
           }
         )
  }

  onRecipeState(item: string) {
    this.buttomState = item;
    switch (item) {
      case 'first':
        this.first_recipe_state = 'active';
        this.second_recipe_state = 'inactive';
        this.third_recipe_state = 'inactive';
        break;
      case 'second':
        this.first_recipe_state = 'inactive';
        this.second_recipe_state = 'active';
        this.third_recipe_state = 'inactive';
        break;
      case 'third':
        this.first_recipe_state = 'inactive';
        this.second_recipe_state = 'inactive';
        this.third_recipe_state = 'active';
        break;
    
      default:
        break;
    }
  }

  upVote(id: number): void {
    let recipe;
    if(this.user_signed_in)
      this.voteService.vote('recipes', id).subscribe(
        res => {
          recipe = this.recipes.find(r => r.id == id);
          recipe.likes = res;
          recipe.liked = true;
        },
        err => console.log(err)
      )
  }

  downVote(id: number): void {
    let recipe;
    if(this.user_signed_in)
      this.voteService.vote('recipes', id).subscribe(
        res => {
          recipe = this.recipes.find(r => r.id == id);
          recipe.likes = res;
          recipe.liked = false;
        },
        err => console.log(err)
      )
  }

}
