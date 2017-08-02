import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Subject } from "rxjs/Rx";

import { CategoryService } from "../services/category";
import { Category } from "../interfaces/category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
