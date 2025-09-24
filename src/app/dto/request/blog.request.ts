export interface CreateBlogRequest{
    title:string;
    subtitle:string;
    region:string;
    boxes:CreateBoxBlogRequest[];
    categoryId:String;
}

export interface CreateBoxBlogRequest{
    index:number;
    content:string;
}