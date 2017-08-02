export interface Category {
    id: number,
    name: string,
    slug: string,
    sub_categories: [
        {
            id: number,
            name: string,
            slug: string,
        }
    ]
}