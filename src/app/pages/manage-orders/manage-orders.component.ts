import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent {
  tabs = [
    // {
    //   name: 'Tất cả',
    //   icon: '',
    //   status:-1
    // },
    {
      name: 'Chờ xác nhận',
      icon: 'double-right',
      status:0
    },
    {
      name: 'Đang pha chế',
      icon: 'double-right',
      status:1
    },
    {
      name: 'Đang giao hàng',
      icon: 'double-right',
      status:2
    },
    {
      name: 'Đã nhận',
      icon: 'double-right',
      status:3
    },
    {
      name: 'Hủy',
      icon: 'double-right',
      status:4
    }
  ];

  count_status = [0,0,0,0,0]

  changeStatus(status:any){

    // if (status==-1)
    // {
    //   this.bills_v=[...this.bills]
    // }else{
    //   this.bills_v=this.bills.filter((bill:any)=>bill.status==status)
    // }
  }

}
