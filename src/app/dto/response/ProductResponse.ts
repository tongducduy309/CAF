import { C } from "@angular/cdk/portal-directives.d-BoG39gYN";
import { CategoryResponse } from "./CategoryResponse";

export interface ProductResponse {
    ids:string[];
    nameId:string;
    name:string;
    image:string;
    description:string;
    status:number;
    createdAt:string;
    sizes:string[];
    costs:string[];
    category:CategoryResponse;

}