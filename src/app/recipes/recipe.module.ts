import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecipeComponent } from './recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CategoriesComponent } from '../categories/categories.component';
import { RecipeShowComponent } from './recipe-show/recipe-show.component';

import { CategoryService } from "../services/category";
import { VoteService } from "../services/vote";

@NgModule({
    imports: [
        CommonModule,
        RecipeRoutingModule,
        SharedModule,
        FormsModule, 
        ReactiveFormsModule,
    ],
    exports: [],
    declarations: [
        RecipeComponent, 
        RecipesComponent, 
        CategoriesComponent, 
        RecipeShowComponent
    ],
    providers: [CategoryService, VoteService],
})
export class RecipeModule { }
