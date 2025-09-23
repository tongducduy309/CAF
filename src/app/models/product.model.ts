import { CategoryResponse } from "../dto/response/CategoryResponse";

export interface Product {
    id:string;
    name:string;
    nameId:string;
    size:string;
    cost:number;
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
    
