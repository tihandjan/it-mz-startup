import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Subject } from "rxjs/Rx";

import { CategoryService } from "../services/category";
import { Category } from "../interfaces/category";
import { Recipe } from "../interfaces/recipe";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  ngUnSubscribe: Subject<void> = new Subject<void>();
  category: Category;
  recipes: Recipe[];

  constructor(
    private router: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategory();
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  getCategory(): void {
    let request = this.router.params.flatMap(
      (params: Params) => this.categoryService.getCategory(params['category'])
    )
    request.takeUntil(this.ngUnSubscribe).subscribe(
      res => {
        this.category = res;
        this.recipes = res['recipes']
        console.log(res)
        console.log(res['recipes'])
      }
    )
  }

}
