import { AfterViewInit, Component } from '@angular/core';
import { Location } from '@angular/common';
import { Page } from 'src/app/classes/page';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends Page implements AfterViewInit{
  tabs = [
    {
      name: 'Tất cả',
      icon: ''
    },{
      name: 'Chờ xác nhận',
      icon: 'double-right'
    },
    {
      name: 'Đang pha chế',
      icon: 'double-right'
    },
    {
      name: 'Đang giao hàng',
      icon: 'double-right'
    },
    {
      name: 'Đã nhận',
      icon: 'double-right'
    },
    {
      name: 'Hủy & Hoàn trả',
      icon: 'double-right'
    }
  ];
  constructor(private location:Location){
    super();
  }
  ngAfterViewInit(): void {
    Promise.resolve().then(()=> {
      // this.getUser()
      this.loaded()
    })
  }
  back(){
    this.location.back();
  }
}
