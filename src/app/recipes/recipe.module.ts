import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe-routing.module';
import { SharedModule } from '../shared/shared.module';

import { RecipeComponent } from './recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CategoriesComponent } from '../categories/categories.component';
import { RecipeShowComponent } from './recipe-show/recipe-show.component';
import { CommentsComponent } from "../shared/comments/comments.component";

import { CategoryService } from "../services/category";

@NgModule({
    imports: [
        CommonModule,
        RecipeRoutingModule,
        SharedModule
    ],
    exports: [],
    declarations: [RecipeComponent, RecipesComponent, CategoriesComponent, RecipeShowComponent, CommentsComponent],
    providers: [CategoryService],
})
export class RecipeModule { }
