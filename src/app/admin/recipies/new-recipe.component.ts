import { ValidateFn } from 'codelyzer/walkerFactory/walkerFn';
import { HeaderComponent } from '../../shared/header/header.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Recipe } from '../../interfaces/recipe';
import { environment } from '../../../environments/environment';
import { RecipeService } from '../../services/recipe';

@Component({
    selector: 'app-new-recipe',
    templateUrl: './new-recipe.component.html',
    styleUrls: ['./recipies.component.scss']
})
export class NewRecipeComponent implements OnInit {
    recipeForm: FormGroup;
    url: any = environment.root_url
    errors: any;
    public filePreviewPath: SafeUrl;
    formGroupNumber: any = undefined;
    submitting: boolean = false;

    constructor(
        private changeDetectorRef: ChangeDetectorRef, 
        private recipeService: RecipeService

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
            'steps': new FormArray([])
        });
        this.onAddStep(1);
    }

    createRecipe() {
        this.recipeService.createRecipe(this.recipeForm.value, 'admin').subscribe(
            res => {
                console.log(res);
                this.submitting = true
            }, 
            err => this.errors = err.json(),
            () => {
                this.recipeForm.reset();
                this.errors = '';
                this.submitting = false;
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
        console.log(this.recipeForm.value);
    }

    onRemoveStep(i) {
        (<FormArray>this.recipeForm.get('steps')).removeAt(i);
    }

    addImageToForm(result) {
        this.recipeForm.get('image').setValue(result)
    }

    addImageToNestedForm(result) {
        (<FormArray>this.recipeForm.get('steps')).controls[this.formGroupNumber].get('image').setValue(result);
    }

    fileChange(input, index){
        this.readFiles(input.files);
        this.formGroupNumber = index;
    }

    readFile(file, reader, callback){
        reader.onload = () => {
            callback(reader.result);
            this.formGroupNumber == undefined ? this.addImageToForm(reader.result) : this.addImageToNestedForm(reader.result)
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

}