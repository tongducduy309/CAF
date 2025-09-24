import { ProductVariant } from "src/app/models/product.model";

export interface CartResponse {
    id: string;
    quantity: number;
    productVariant: ProductVariant;
    product:ProductInCartResponse;
    note: string;
}

export interface ProductInCartResponse {
    id: string;
    name: string;
    description: string;
    img: string;
    status: boolean;
}

