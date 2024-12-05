import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit{
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

  bills:any =  {}
  constructor (private crud:CrudService){

  }
  ngOnInit(): void {
    this.getBills()
  }

  getBills(){
    this.crud.get("bills","all").subscribe((res:any)=>{
      if(res.result=='success'){
        this.bills = res.data
        console.log(res.data);
      }
    })
  }


  changeStatus(status:any){

    // if (status==-1)
    // {
    //   this.bills_v=[...this.bills]
    // }else{
    //   this.bills_v=this.bills.filter((bill:any)=>bill.status==status)
    // }
  }

}
