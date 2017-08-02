import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeComponent } from './recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CategoriesComponent } from '../categories/categories.component';
import { RecipeShowComponent } from './recipe-show/recipe-show.component';

const routes: Routes = [
  { path: '', component: RecipeComponent, children: [
    { path: '', component: RecipesComponent },
    { path: ':category', component: CategoriesComponent },
    { path: ':category/:slug', component: RecipeShowComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule { }

export const routedComponents = [RecipeComponent];