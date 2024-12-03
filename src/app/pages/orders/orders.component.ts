import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Page } from 'src/app/classes/page';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends Page implements OnInit{
  tabs = [
    {
      name: 'Tất cả',
      icon: '',
      status:-1
    },{
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

  bills:any=[]
  bills_v:any=[]
  constructor(private location:Location, private crud:CrudService, private main:MainService){
    super();
    this.must_load=1
  }
  ngOnInit(): void {
    this.getBills()
  }
  back(){
    this.location.back();
  }

  getBills(){
    const user = this.main.getCookie("u-caf")
    if (user){
      this.crud.get("bills",user.uid).subscribe((res:any)=>{
        this.bills=res.data
        this.bills_v = [...this.bills]
        this.loaded()
      })
    }
  }

  changeStatus(status:any){
  
    if (status==-1)
    {
      this.bills_v=[...this.bills]
    }else{
      this.bills_v=this.bills.filter((bill:any)=>bill.status==status)
    }
  }
}
