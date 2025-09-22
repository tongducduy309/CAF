import { DateTimeParts } from "src/app/utils/Date";
import { CategoryResponse } from "./CategoryResponse";

export interface BlogHTMLResponse {
    index?: number;
    title?: string;
    subtitle?: string;
    createdAt?: DateTimeParts;
    category?:CategoryResponse;
    content?: string;
}