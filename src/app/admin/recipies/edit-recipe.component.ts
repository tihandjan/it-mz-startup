import { Component, OnInit, ChangeDetectorRef, HostBinding } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { RecipeService } from '../../services/recipe';

import { slideElement } from './animations'
import { routerAnimation } from "../../shared/animations/router-animation";

@Component({
    selector: 'app-edit-recipe',
    templateUrl: './edit-recipe.component.html',
    styleUrls: ['./recipies.component.scss'],
    animations: [
        slideElement,
        routerAnimation
    ]
})
export class EditRecipeComponent implements OnInit {
    @HostBinding('@routerState') routerAnimation = true
    recipe;
    recipeForm: FormGroup;
    ingredientForm: FormGroup;
    formGroupNumber: any = undefined;
    public filePreviewPath: SafeUrl;
    errors: any;
    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private recipeService: RecipeService,
        private router: ActivatedRoute,
        private route: Router
    ) { }

    ngOnInit() {
        this.recipeForm = new FormGroup({
            'title': new FormControl('', Validators.required),
            'summary': new FormControl('', Validators.required),
            'time': new FormControl('', Validators.required),
            'complexity': new FormControl('Сложность готовки', Validators.required),
            'publish': new FormControl('', Validators.required),
            'porsion': new FormControl('', Validators.required),
            'image': new FormControl(''),
            'category_id': new FormControl('Выберите категорию'),
            'sub_category_id': new FormControl('Вид блюда'),
            'country_id': new FormControl('Кухня какой страны'),
            'steps': new FormArray([]),
            'recipes_ingredients': new FormArray([])
        });

        this.ingredientForm = new FormGroup({
            'name': new FormControl('', Validators.required),
            'fats': new FormControl(null),
            'proteins': new FormControl(null),
            'carbohydrates': new FormControl(null),
            'calories': new FormControl(null),
            'image': new FormControl(''),
        })
        this.getRecipe();
    }

    getRecipe(): void {
        let request = this.router.params.flatMap(
            (param: Params) => this.recipeService.getRecipe(param['slug'])
        )

        request.subscribe(
            res => {
                this.recipe = res;
                this.recipeForm.get('title').setValue(res.title);
                this.recipeForm.get('summary').setValue(res.summary);
                this.recipeForm.get('time').setValue(res.time);
                this.recipeForm.get('complexity').setValue(res.complexity);
                this.recipeForm.get('publish').setValue(res.publish);
                this.recipeForm.get('porsion').setValue(res.porsion);
                this.filePreviewPath = res.image.thumb.url;
            },
            err => console.log(err)
        )
        
    }

    editRecipe(): void {
        if(this.recipeForm.get('image').value.length == 0) {
            this.recipeForm.removeControl('image')
        }
        this.recipeService.editRecipe(this.recipeForm.value, this.recipe.id).subscribe(
            res => {
                this.route.navigate(['/recipes/', res.category.slug, res.slug])
            }, 
            err => {
                this.errors = err.json();
            },
            () => {
                this.errors = '';
            }
        )
    }

    //******image upload *********/
    addImageToForm(result) {
        this.recipeForm.get('image').setValue(result)
    }

    addImageToNestedForm(result) {
        (<FormArray>this.recipeForm.get('steps')).controls[this.formGroupNumber].get('image').setValue(result);
    }

    addImageToIngredient(result) {
        this.ingredientForm.get('image').setValue(result);
    }

    fileChange(input, index){
        this.readFiles(input.files);
        this.formGroupNumber = index;
    }

    readFiles(files, index=0){
        // Create the file reader
        let reader = new FileReader();
        
        // If there is a file
        if (index in files){
            // Start reading this file
            this.readFile(files[index], reader, (result) =>{
              if (this.formGroupNumber == undefined) {
                  this.filePreviewPath = result;
              }
            });
        } else {
            // When all files are done This forces a change detection
            this.changeDetectorRef.detectChanges();
        }
    }

    readFile(file, reader, callback){
        reader.onload = () => {
            callback(reader.result);
            if (this.formGroupNumber == undefined) {
                this.addImageToForm(reader.result);
            } else if(this.formGroupNumber == 'ingr') {
                this.addImageToIngredient(reader.result);
            } else {
                this.addImageToNestedForm(reader.result);
            }
        }
        reader.readAsDataURL(file);
    }
     //******image upload end *********/

}