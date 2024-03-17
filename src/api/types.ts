export type GetProductsResponse = Product[];

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    count: number;
    thumbnail: string;
}
