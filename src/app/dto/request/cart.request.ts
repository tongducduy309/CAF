export interface UpdateQuantityCartRequest{
    productVariantId:string;
    quantity:number;
}

export interface CartRequest {
    productId:string;
    productVariantId:string;
    quantity:number;
    note:string;
}

export interface ProductInCartRequest{
  productId:string;
  name:string;
  size:string;
  productVariantId:string;
  quantity:number;
  note:string;
}