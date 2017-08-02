import { Recipe } from "./recipe";

export interface Category {
    id: number,
    name: string,
    slug: string,
    recipes: Recipe[],
    sub_categories: [
        {
            id: number,
            name: string,
            slug: string,
        }
    ]
}