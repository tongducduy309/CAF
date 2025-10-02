import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OrderType, OrderStatus } from 'src/app/enums/Order.enum';
import { PaymentStatus, PaymentMethod } from 'src/app/enums/Payment.enum';
import { Order } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  standalone:false
})
export class OrderComponent implements OnChanges{

  @Input() order:Order = {
    id: 0,
    orderCode: '',
    orderType: OrderType.PICKUP,
    orderStatus: OrderStatus.PENDING,
    paymentStatus: PaymentStatus.UNPAID,
    paymentMethod: PaymentMethod.CASH,
    subtotal: 0,
    shippingFee: 0,
    discount: 0,
    tax: 0,
    total: 0,
    orderItems: [],
    createdAt: '',
    updatedAt: ''
  }
  total = 0
  FILE_URL = environment.variable_global.FILE_URL;

  constructor(public main:MainService){

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order']){
      this.total=0
      for (let p of this.order.orderItems){
        this.total+=p.quantity*1
      }
    }
  }

  formatDateToString(s:any){
    if (s){
      const date = new Date(s);

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    }
    return null
  }
}
