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
            'steps': new FormArray([
            ])
        });
    }

    createRecipe() {
        this.recipeService.createRecipe(this.recipeForm.value, 'admin').subscribe(
            res => console.log(res), 
            err => this.errors = err.json(),
            () => this.recipeForm.reset()
        )
    }

    onAddStep() {
        const formG = new FormGroup({
            'step': new FormControl('lol')
        });
        (<FormArray>this.recipeForm.get('steps')).push(formG);
        console.log(this.recipeForm.value)
    }

    fileChange(input){
        this.readFiles(input.files);
    }

    readFile(file, reader, callback){
        reader.onload = () => {
            callback(reader.result);
            this.recipeForm.value.image = reader.result;
    }
    reader.readAsDataURL(file);
    }
    readFiles(files, index=0){
        // Create the file reader
        let reader = new FileReader();
        
        // If there is a file
        if(index in files){
            // Start reading this file
            this.readFile(files[index], reader, (result) =>{
              this.filePreviewPath = result
            });
        }else{
            // When all files are done This forces a change detection
            this.changeDetectorRef.detectChanges();
        }
    }

}