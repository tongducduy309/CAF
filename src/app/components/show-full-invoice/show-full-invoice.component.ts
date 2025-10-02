import { P } from '@angular/cdk/portal-directives.d-BoG39gYN';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { OrderStatus, OrderType } from 'src/app/enums/Order.enum';
import { PaymentStatus, PaymentMethod } from 'src/app/enums/Payment.enum';
import { Order } from 'src/app/models/order.model';
import { MainService } from 'src/services/main.service';

@Component({
    selector: 'app-show-full-invoice',
    templateUrl: './show-full-invoice.component.html',
    styleUrls: ['./show-full-invoice.component.scss'],
    standalone: false
})
export class ShowFullInvoiceComponent implements OnChanges{
  @Input() order:Partial<Order> = {
  }
  status = {
    text: 'Chờ xác nhận',
    color: 'blue'
  }
  OrderType = OrderType;
  constructor (public main:MainService){
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order']){
      switch (this.order?.orderStatus){
        case OrderStatus.PREPARING:
          this.status.text = 'Đang pha chế'
          this.status.color = 'orange'
          break;
        case OrderStatus.SHIPPING:
          this.status.text = 'Đang giao hàng'
          this.status.color = 'purple'
          break;
        case OrderStatus.DELIVERED:
          this.status.text = 'Đã nhận'
          this.status.color = 'green'
          break;
        case OrderStatus.CANCELLED:
          this.status.text = 'Hủy'
          this.status.color = 'red'
          break;
        default:
          this.status.text = 'Chờ xác nhận'
          this.status.color = 'blue'
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
