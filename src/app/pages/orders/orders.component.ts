import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';
import { OrderService } from 'src/app/services/order.service';
import { LayoutService } from 'src/app/services/layout.service';
import { OrderStatus } from 'src/app/enums/Order.enum';
import { Order } from 'src/app/models/order.model';
@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    standalone: false
})
export class OrdersComponent implements OnInit{
  tabs = [
    {
      name: 'Tất cả',
      icon: '',
      status:"ALL"
    },{
      name: 'Chờ xác nhận',
      icon: 'swap-right',
      status:OrderStatus.PENDING
    },
    {
      name: 'Đang pha chế',
      icon: 'swap-right',
      status:OrderStatus.PREPARING
    },
    
    {
      name: 'Đang giao hàng',
      icon: 'swap-right',
      status:OrderStatus.DELIVERING
    },
    {
      name: 'Hoàn thành',
      icon: 'swap-right',
      status:OrderStatus.RECEIVED
    },
    {
      name: 'Hủy',
      icon: 'swap-right',
      status:OrderStatus.CANCELLED
    }
  ];

  orders:any=[]
  orders_v:any=[]
  orderService = inject(OrderService)
  layoutService = inject(LayoutService)
  constructor(private location:Location, private crud:CrudService, private main:MainService){
  }
  ngOnInit(): void {
    this.getOrders();
  }
  back(){
    this.location.back();
  }

  getOrders(){
    this.orderService.getAllMyOrders().then(res=>{
      this.orders=res
      this.orders_v = [...this.orders]
      console.log(this.orders);
      this.layoutService.setReady();
    });
  }

  changeStatus(status:OrderStatus|string){
  
    if (status=="ALL")
    {
      this.orders_v=[...this.orders]
    }else{
      this.orders_v=this.orders.filter((order:Order)=>order.orderStatus==status)
    }
  }
}
