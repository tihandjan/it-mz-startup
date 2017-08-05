import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { RecipeService } from '../../services/recipe';
import { Recipe } from '../../interfaces/recipe';
import { fadeInTrigger } from "./animations";

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
  recipies: Array<Recipe>;

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
          res => this.recipies = res,
          error => console.log(error)
        )
  }

}
