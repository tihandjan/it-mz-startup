import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Recipe } from '../../interfaces/recipe'
import { RecipeService } from '../../services/recipe'

@Component({
    selector: 'app-new-recipe',
    templateUrl: './new-recipe.component.html',
    styleUrls: ['./recipies.component.scss']
})
export class NewRecipeComponent implements OnInit {
    recipeForm: FormGroup;
    errors: any;
    constructor(
        private recipeService: RecipeService
    ) { }

    ngOnInit() {
        this.recipeForm = new FormGroup({
            'title': new FormControl('', Validators.required),
            'summary': new FormControl('', Validators.required),
            'time': new FormControl('', Validators.required),
            'portion': new FormControl('', Validators.required),
            'complexity': new FormControl('', Validators.required),
            'publish': new FormControl('', Validators.required)
        })
    }

    createRecipe() {
        this.recipeService.createRecipe(this.recipeForm.value).subscribe(
            res => console.log(res),
            error => this.errors = error
        )
    }


}