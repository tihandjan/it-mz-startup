import { 
  Component, 
  OnInit,
  state,
  style,
  trigger,
  animate,
  transition
 } from '@angular/core';

import { Recipe } from '../models/recipe';
import { Article } from '../models/article';
import { AdminAuthService } from '../services/admin-auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('buttomState', [
      state('first', style({
        left: 0
      })),
      state('second', style({
        left: '132px'
      })),
      state('third', style({
        left: '270px'
      })),
      transition('first <=> second', animate('200ms ease-out')),
      transition('first <=> third', animate('200ms ease-out')),
      transition('second <=> third', animate('200ms ease-out'))
    ])
  ]
})
export class MainComponent implements OnInit {
  buttomState: string = 'first';
  first_recipe_state: string = 'active';
  second_recipe_state: string = 'inactive';
  third_recipe_state: string = 'inactive';
  test_array: Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12];
  recipes: Recipe[] = [
    {
      title: 'Ceg из горбуши с анчоусами под сладким соусом',
      summary: 'summary',
      image_big: 'https://dummyimage.com/467x350/b8329d/000.png',
      image_long: 'https://dummyimage.com/467x230/000/000.png',
      image_small: 'https://dummyimage.com/230x230/000/000.png'     
    },
    {
      title: 'Ceg из горбуши с анчоусами под сладким соусом',
      summary: 'summary',
      image_big: 'https://dummyimage.com/467x350/000/fff.png',
      image_long: 'https://dummyimage.com/467x230/000/fff.png',
      image_small: 'https://dummyimage.com/230x230/000/fff.png'
    },
    {
      title: 'the fat ass under the t-shirt',
      summary: 'the fat ass under the t-shirt summary',
      image_big: 'https://dummyimage.com/467x350/000/fff.png',
      image_long: 'https://dummyimage.com/467x230/000/fff.png',
      image_small: 'https://dummyimage.com/230x230/000/fff.png'
    }
  ];
  top_recipe = this.recipes[0];
  top_article = {
      title: 'Ceg из горбуши с анчоусами под сладким соусом',
      summary: 'summary',
      image_big: 'https://dummyimage.com/467x350/000/000.png',
      image_long: 'https://dummyimage.com/467x230/000/000.png',
      image_small: 'https://dummyimage.com/230x230/000/000.png'
    };
  constructor(
    private adminAuth: AdminAuthService
  ) { }

  ngOnInit() {
  }

  onRecipeState(item: string) {
    this.buttomState = item;
    switch (item) {
      case 'first':
        this.first_recipe_state = 'active';
        this.second_recipe_state = 'inactive';
        this.third_recipe_state = 'inactive';
        break;
      case 'second':
        this.first_recipe_state = 'inactive';
        this.second_recipe_state = 'active';
        this.third_recipe_state = 'inactive';
        break;
      case 'third':
        this.first_recipe_state = 'inactive';
        this.second_recipe_state = 'inactive';
        this.third_recipe_state = 'active';
        break;
    
      default:
        break;
    }
  }

}
