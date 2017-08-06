import { Component, OnInit, ChangeDetectorRef, OnDestroy, HostBinding } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Subject } from "rxjs/Subject";

import { Recipe } from '../../interfaces/recipe';
import { Category } from '../../interfaces/category';
import { SubCategory } from '../../interfaces/sub_category';
import { Country } from '../../interfaces/country';
import { Ingredient } from '../../interfaces/ingredient';

import { RecipeService } from '../../services/recipe';
import { IngredientService } from '../../services/ingredient';
import { CategoryService } from '../../services/category';
import { CountryService } from '../../services/country';

import { environment } from '../../../environments/environment';
import { slideElement } from './animations'
import { routerAnimation } from "../../shared/animations/router-animation";

@Component({
    selector: 'app-new-recipe',
    templateUrl: './new-recipe.component.html',
    styleUrls: ['./recipies.component.scss', '../shared.css'],
    animations: [
        slideElement,
        routerAnimation
    ]
})
export class NewRecipeComponent implements OnInit, OnDestroy {
    @HostBinding('@routerState') routerAnimation = true
    recipeForm: FormGroup;
    url: any = environment.root_url
    errors: any;
    formGroupNumber: any = undefined;
    ingredients: Ingredient[];
    ingredients_for_select: Array<object>;
    public filePreviewPath: SafeUrl;
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    ingredientForm: FormGroup;
    ingredient_form_is_visible: boolean = false;
    ingredients_errors: any;
    new_ingredient_name: string;
    categories: Category[];
    countries: Country[];
    sub_categories: SubCategory[];
    selected_category_name: string;

    constructor(
        private changeDetectorRef: ChangeDetectorRef, 
        private recipeService: RecipeService,
        private ingredientService: IngredientService,
        private categoryService: CategoryService,
        private countryService: CountryService,
    ) { }

    ngOnInit() {
        this.recipeForm = new FormGroup({
            'title': new FormControl('', Validators.required),
            'summary': new FormControl('', Validators.required),
            'time': new FormControl('', Validators.required),
            'complexity': new FormControl('Сложность готовки', Validators.required),
            'publish': new FormControl('', Validators.required),
            'porsion': new FormControl('', Validators.required),
            'image': new FormControl('', Validators.required),
            'category_id': new FormControl('Выберите категорию', Validators.required),
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
        this.onAddStep(1);
        this.onAddRecipeIngredient();
        this.getIngredients();
        this.getCategories();
        this.getCountries();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    createIngredient() {
        this.ingredientService.createIngredient(this.ingredientForm.value, 'admin').subscribe(
            res => {
                this.ingredient_form_is_visible = false;
                this.ingredientForm.reset();
                this.new_ingredient_name = res.name;
                this.ingredients_errors = '';
                this.getIngredients();
            },
            err => this.ingredients_errors = err.json()
        )
    }

    createRecipe() {
        this.recipeService.createRecipe(this.recipeForm.value, 'admin').subscribe(
            res => {
                true
            }, 
            err => {
                this.errors = err.json();
                console.log(this.errors)
            },
            () => {
                // this.recipeForm.reset();
                this.errors = '';
            }
        )
    }

    onAddStep(i) {
        const formG = new FormGroup({
            'step': new FormControl(i, Validators.required),
            'image': new FormControl(null),
            'content': new FormControl(null, Validators.required),
        });
        (<FormArray>this.recipeForm.get('steps')).push(formG);
    }

    onRemoveStep(i) {
        (<FormArray>this.recipeForm.get('steps')).removeAt(i);
    }

    onAddRecipeIngredient(): void {
        const riFormG = new FormGroup({
            'amount': new FormControl(null, Validators.required),
            'unit': new FormControl('грамм', Validators.required),
            'ingredient_id': new FormControl(null, Validators.required),
        });
        (<FormArray>this.recipeForm.get('recipes_ingredients')).push(riFormG);
    }

    onRemoveRecipeIngredient(i): void {
        (<FormArray>this.recipeForm.get('recipes_ingredients')).removeAt(i);
    }

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

    public refreshValue(value:any, index:number):void {
        (<FormArray>this.recipeForm.get('recipes_ingredients')).controls[index].get('ingredient_id').setValue(value.id)
    }

    onCategoryChange(event): void {
        let data = this.findCategoryById(event.target.value)
        this.sub_categories = data[0]['sub_categories']
        this.selected_category_name = data[0].name
        console.log(data[0]['sub_categories'])
    }

    findCategoryById(id: number): Category[] {
        return this.categories.filter(
            cat => cat.id == id
        )
    }

    getCategories(): void {
        this.categoryService.getCategories()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
            res => {
                this.categories = res;
            },
            err => console.log(err)
        )
    }

    getCountries(): void {
        this.countryService.getCountry()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (res: Country[]) => this.countries = res,
                err => console.log(err)
            )
    }

}