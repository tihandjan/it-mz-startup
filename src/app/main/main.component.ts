import { Component, OnInit } from '@angular/core';

import { Recipe } from '../models/recipe';
import { Article } from '../models/article';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  recipes: Recipe[] = [
    {
      title: 'Ceg из горбуши с анчоусами под сладким соусом',
      summary: 'summary',
      image_big: 'https://dummyimage.com/467x350/000/000.png',
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
  constructor() { }

  ngOnInit() {
  }

}
