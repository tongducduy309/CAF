import { CategoryResponse } from "../dto/response/category.response";

export interface Product {
    id:string;
    name:string;
    size:string;
    description:string;
    img:string;
    status:boolean;
    category:CategoryResponse;
    variants:ProductVariant[];
}

export interface ProductVariant {
    id: string;
    size: string;
    price: number;
    status: boolean;
}

export interface DetailProduct{
    id:string;
    name:string;
    quantity:number;
    size:string;
    description:string;
    img:string;
    status:boolean;
    category:CategoryResponse;
    variant:ProductVariant;
}
    
