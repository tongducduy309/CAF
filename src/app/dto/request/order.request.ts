import { OrderType } from "src/app/enums/Order.enum";
import { PaymentMethod } from "src/app/enums/Payment.enum";

export interface CreateOrderRequest{
    userId:string;
    items:OrderItemRequest[],
    orderType:OrderType,
    paymentMethod:PaymentMethod,
    note:string
}

export interface OrderItemRequest{
    productVariantId:string;
    quantity:number
    note:string
}