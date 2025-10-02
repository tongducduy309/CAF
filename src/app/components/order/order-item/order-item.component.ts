import { Component, Input } from '@angular/core';
import { CartResponse } from 'src/app/dto/response/cart.response';
import { OrderItem } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
  standalone:false
})
export class OrderItemComponent {
  @Input() item:Partial<OrderItem>|Partial<CartResponse> = {}
  FILE_URL = environment.variable_global.FILE_URL;
  constructor(public main:MainService){

  }
}
