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
  displayedRecipies: Recipe[] = []

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
          },
          error => console.log(error)
        )
  }

  onAnimationDone(event: AnimationEvent, index: number): void {
    if(this.recipies.length > index + 1) {
      this.displayedRecipies.push(this.recipies[index + 1])
    }
  }

}
