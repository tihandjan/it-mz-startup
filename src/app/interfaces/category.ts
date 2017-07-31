export interface Category {
    id: number,
    name: string,
    sub_categories: [
        {
            id: number,
            name: string,
        }
    ]
}