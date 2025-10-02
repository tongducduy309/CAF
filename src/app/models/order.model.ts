import { OrderStatus, OrderType } from "../enums/Order.enum";
import { PaymentStatus, PaymentMethod } from "../enums/Payment.enum";
import { Product, ProductVariant } from "./product.model";
import { User } from "./user.model";

export interface Order {
    id: number;
    orderCode: string;
    orderType: OrderType;
    orderStatus: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    subtotal: number;
    shippingFee: number;
    discount: number;
    tax: number;
    total: number;
    orderItems: OrderItem[];
    user?: User;
    createdAt: string;
    updatedAt: string;
    note?: string;
}

export interface OrderItem {
    id: number;
    product: Product;
    productVariant: ProductVariant;
    quantity: number;
    price: number;
    lineTotal: number;
    percentSale?: number;
    note?: string;
}
  