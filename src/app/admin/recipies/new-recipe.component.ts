import { HeaderComponent } from '../../shared/header/header.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Recipe } from '../../interfaces/recipe';
import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AdminAuthService } from '../../services/admin-auth';

@Component({
    selector: 'app-new-recipe',
    templateUrl: './new-recipe.component.html',
    styleUrls: ['./recipies.component.scss']
})
export class NewRecipeComponent implements OnInit {
    recipeForm: FormGroup;
    url: any = environment.root_url
    errors: any;
    public uploader: FileUploader = new FileUploader({});
    constructor(
        private adminAuth: AdminAuthService
    ) { }

    ngOnInit() {
        let tokens = this.adminAuth.tokens;
        this.recipeForm = new FormGroup({
            'title': new FormControl('', Validators.required),
            'summary': new FormControl('', Validators.required),
            'time': new FormControl('', Validators.required),
            'portion': new FormControl('', Validators.required),
            'complexity': new FormControl('', Validators.required),
            'publish': new FormControl('', Validators.required),
            'porsion': new FormControl('', Validators.required),
        });
        this.uploader.setOptions({
            url: this.url + '/recipes',
            headers: [
                {name: 'Accept', value: 'application/json'},
                {name: 'access-token', value: tokens.accessToken},
                {name: 'client', value: tokens.client},
                {name: 'uid', value: tokens.uid},
                {name: 'expiry', value: tokens.expiry},
                {name: 'token-type', value: tokens.tokenType},
            ]
        });
        this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
            form.append('title', this.recipeForm.value.title);
            form.append('summary', this.recipeForm.value.summary);
            form.append('time', this.recipeForm.value.time);
            form.append('portion', this.recipeForm.value.portion);
            form.append('complexity', this.recipeForm.value.complexity);
            form.append('publish', this.recipeForm.value.publish);
            form.append('porsion', this.recipeForm.value.porsion);
        };
        this.uploader.onErrorItem = ((item:FileItem, response:string, status:number, headers:any):any => {
            this.errors = JSON.parse(response);
        });
    }

    createRecipe() {
        this.uploader.uploadAll();
    }

}