import { 
  Component, 
  OnInit,
  OnDestroy,
  state,
  style,
  trigger,
  animate,
  transition
 } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Subject } from "rxjs/Rx";

import { Recipe } from '../models/recipe';
import { Article } from '../models/article';

import { RecipeService } from "../services/recipe";
import { btnTriggerFilter, showElements } from "./animations";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    btnTriggerFilter,
    showElements
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
  top_article = {
      title: 'Ceg из горбуши с анчоусами под сладким соусом',
      summary: 'summary',
      image_big: 'https://dummyimage.com/467x350/000/000.png',
      image_long: 'https://dummyimage.com/467x230/000/000.png',
      image_small: 'https://dummyimage.com/230x230/000/000.png'
    };
  constructor(
    private auth: Angular2TokenService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.getRecipes();
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
             this.recipes = res.slice(5, 13)
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

}
