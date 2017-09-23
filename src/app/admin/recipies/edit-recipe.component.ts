import { Component, OnInit, ChangeDetectorRef, HostBinding, OnDestroy } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subject } from "rxjs/Subject";

import { Category } from '../../interfaces/category';
import { SubCategory } from '../../interfaces/sub_category';
import { Country } from '../../interfaces/country';

import { RecipeService } from '../../services/recipe';
import { CategoryService } from '../../services/category';
import { CountryService } from '../../services/country';
import { IngredientService } from '../../services/ingredient';

import { slideElement } from './animations'
import { routerAnimation } from "../../shared/animations/router-animation";

@Component({
    selector: 'app-edit-recipe',
    templateUrl: './edit-recipe.component.html',
    styleUrls: ['./recipies.component.scss', '../shared.css'],
    animations: [
        slideElement,
        routerAnimation
    ]
})
export class EditRecipeComponent implements OnInit, OnDestroy {
    @HostBinding('@routerState') routerAnimation = true
    recipe;
    recipeForm: FormGroup;
    ingredientForm: FormGroup;
    stepForm: FormGroup;
    formGroupNumber: any = undefined;
    public filePreviewPath: SafeUrl;
    errors: any;
    categories: Category[];
    countries: Country[];
    sub_categories: SubCategory[];
    selected_category_name: string;
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    ingredients;
    ingredients_for_select: Array<object>;
    recipes_ingredients;
    ingredient_removed: boolean = false;
    step_removed: boolean = false;
    ingredientFormVisible: boolean = false;
    stepFormVisible: boolean = false
    ingredient_errors: any;
    step_errors: any;
    recipe_steps;
    stepBtnDisabled: boolean = false;
    ingredientBtnDisabled: boolean = false;
    recipeBtnDisabled: boolean = false;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private recipeService: RecipeService,
        private router: ActivatedRoute,
        private route: Router,
        private categoryService: CategoryService,
        private countryService: CountryService,
        private ingredientService: IngredientService,
    ) { }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

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
        });

        this.ingredientForm = new FormGroup({
            'amount': new FormControl(null, Validators.required),
            'unit': new FormControl('грамм', Validators.required),
            'ingredient_id': new FormControl(null, Validators.required),
            'recipe_id': new FormControl(null)
        });

        this.stepForm = new FormGroup({
            'content': new FormControl(null, Validators.required),
            'step': new FormControl(null, Validators.required),
            'image': new FormControl(null),
            'recipe_id': new FormControl(null),
        })

        this.getRecipe();
        this.getIngredients();
    }

    getRecipe(): void {
        let request = this.router.params.flatMap(
            (param: Params) => this.recipeService.getRecipe(param['slug'])
        )

        request.takeUntil(this.ngUnsubscribe).subscribe(
            res => {
                this.recipe = res;
                this.recipeForm.get('title').setValue(res.title);
                this.recipeForm.get('summary').setValue(res.summary);
                this.recipeForm.get('time').setValue(res.time);
                this.recipeForm.get('complexity').setValue(res.complexity);
                this.recipeForm.get('publish').setValue(res.publish);
                this.recipeForm.get('porsion').setValue(res.porsion);
                this.filePreviewPath = res.image.thumb.url;
                this.getCountries(res.country.id);
                this.getCategories(res.category.id);
                this.recipes_ingredients = res['recipes_ingredients'];
                this.recipe_steps = res['steps'];
            },
            err => console.log(err)
        )
        
    }

    editRecipe(): void {
        this.recipeBtnDisabled = true;
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
                this.recipeBtnDisabled = false;
            }
        )
    }

    onCategoryChange(event): void {
        let data;
        if(typeof(event) == 'number') {
            data = this.findCategoryById(event);
        } else {
            data = this.findCategoryById(event.target.value);
        }
        this.sub_categories = data[0]['sub_categories'];
        this.selected_category_name = data[0].name;
    }

    findCategoryById(id: number): Category[] {
        return this.categories.filter(
            cat => cat.id == id
        )
    }

    public refreshValue(value:any, index:number):void {
        this.ingredientForm.get('ingredient_id').setValue(value.id);
    }

    getCategories(id: number): void {
        this.categoryService.getCategories()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
            res => {
                {
                    this.categories = res;
                    this.recipeForm.get('category_id').setValue(id);
                    this.onCategoryChange(id);
                    this.recipeForm.get('sub_category_id').setValue(this.recipe.sub_category_id)
                };
            },
            err => console.log(err)
        )
    }

    getCountries(id): void {
        this.countryService.getCountry()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (res: Country[]) => {
                    this.countries = res;
                    this.recipeForm.get('country_id').setValue(id);
                },
                err => console.log(err)
            )
    }

    //******image upload *********/
    addImageToForm(result) {
        this.recipeForm.get('image').setValue(result)
    }

    addImageToStep(result) {
        this.stepForm.get('image').setValue(result);
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
            } else if(this.formGroupNumber == 'step') {
                this.addImageToStep(reader.result);
            }
        }
        reader.readAsDataURL(file);
    }
     //******image upload end *********/

     getIngredients(): void {
        this.ingredientService.getIngredients()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                response => {
                    this.ingredients = response;
                    this.ingredients_for_select = response.map(
                        res => {
                            return {id: res.id, text: res.name}
                        }
                    );
                },
                error => console.log(error)
        )
    }

    onRemoveRecipeIngredient(id: number): void {
        let conf = confirm('Вы правда хотите удалить этот ингредиент?')
        if(conf)
            this.ingredientService.removeRecipesIngredient(id).subscribe(
                res => {
                    if(res.status == 204)
                      this.recipes_ingredients = this.recipes_ingredients.filter(ing =>{
                          return ing.id !== id
                      });
                      this.ingredient_removed = true;
                      setTimeout(()=> {
                          this.ingredient_removed = false;
                      }, 2500);
                },
                err => console.log('Шо то не то!!!АСТАНАВИТЕСЬ!!!')
            )
    }

    onRemoveRecipeStep(id: number): void {
        let conf = confirm('Вы правда хотите удалить этот шаг?')
        if(conf)
            this.recipeService.removeRecipeStep(id).subscribe(
                res => {
                    if(res.status == 204)
                      this.recipe_steps = this.recipe_steps.filter(step =>{
                          return step.id !== id
                      });
                      this.step_removed = true;
                      setTimeout(()=> {
                          this.step_removed = false;
                      }, 2500);
                },
                err => console.log('Шо то не то!!!АСТАНАВИТЕСЬ!!!')
            )
    }

    getIngName(id: number) {
        let ing = this.ingredients.find(ing => {
            return ing.id == id
        })
        return ing.name;
    }

    onAddRecipeIngredient(): void {
        this.ingredientFormVisible = !this.ingredientFormVisible;
    }

    addIngredient(): void {
        this.ingredientForm.get('recipe_id').setValue(this.recipe.id);
        this.ingredientBtnDisabled = true;
        this.ingredientService.addRecipeIngredient(this.ingredientForm.value).subscribe(
            res => {
                this.recipes_ingredients.push(res);
                this.ingredientFormVisible = false;
                this.ingredientForm.reset();
            },
            err => this.ingredient_errors = err.json(),
            ()=> this.ingredientBtnDisabled = false
        )
    }

    onAddRecipeStep(): void {
        this.stepFormVisible = !this.stepFormVisible;
    }

    addStep(): void {
        this.stepForm.get('recipe_id').setValue(this.recipe.id);
        this.stepBtnDisabled = true;
        this.recipeService.addRecipeStep(this.stepForm.value).subscribe(
            res => {
                this.recipe_steps.push(res);
                this.stepFormVisible = false;
                this.stepForm.reset();
            },
            err => this.step_errors = err.json(),
            ()=> this.stepBtnDisabled = false
        )
    }

}