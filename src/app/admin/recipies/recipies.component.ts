import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { RecipeService } from '../../services/recipe';
import { Recipe } from '../../interfaces/recipe';
import { fadeInTrigger } from "./animations";

import { AnimationEvent } from "@angular/animations";

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.scss', '../shared.css'],
  animations: [
    fadeInTrigger
  ]
})
export class RecipiesComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  recipies: Recipe[];
  displayedRecipies: Recipe[] = [];
  loading: boolean = true;

  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.getRecipies();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getRecipies() {
    this.recipeService.getRecipies()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
          res => {
            this.recipies = res;
            this.displayedRecipies.push(res[0]);
            this.loading = false;
          },
          error => console.log(error)
        )
  }

  onAnimationDone(event: AnimationEvent, index: number): void {
    if(this.recipies.length > index + 1) {
      this.displayedRecipies.push(this.recipies[index + 1])
    }
  }

  removeRecipe(id: number): void {
    let answer = prompt('Если вы действительно хотите удалить этот рецепт введите' + "(" + id + ")");
    if( parseInt(answer) == id)
      this.recipeService.removeRecipe(id).subscribe(
        res => {
          if(res.status == 204)
            this.displayedRecipies = this.displayedRecipies.filter(recipe =>{
              return recipe.id !== id;
            });
        }
      )
  }

  approveToggle(id: number): void {
    this.recipeService.approveToggle(id).subscribe(
      res => {
        let index = this.displayedRecipies.findIndex(recipe => recipe.id == id);
        this.displayedRecipies[index].approved = res.approved;
      }, 
      err => console.log('АСТАНАВИТЕСЬ!!!')
    )
  }

}
