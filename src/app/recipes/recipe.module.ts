import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe-routing.module';
import { SharedModule } from '../shared/shared.module';

import { RecipeComponent } from './recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CategoriesComponent } from '../categories/categories.component';
import { RecipeShowComponent } from './recipe-show/recipe-show.component';

@NgModule({
    imports: [
        CommonModule,
        RecipeRoutingModule,
        SharedModule
    ],
    exports: [],
    declarations: [RecipeComponent, RecipesComponent, CategoriesComponent, RecipeShowComponent],
    providers: [],
})
export class RecipeModule { }
