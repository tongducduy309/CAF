import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

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

  tab_status = 0

  choose_bill = 0

  bills:any =  {}

  isFormCancel = false

  comment = ''
  constructor (private crud:CrudService, private main:MainService){

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
    this.tab_status = status
    this.choose_bill=0
    // if (status==-1)
    // {
    //   this.bills_v=[...this.bills]
    // }else{
    //   this.bills_v=this.bills.filter((bill:any)=>bill.status==status)
    // }
  }

  previous(){
    if (this.choose_bill>0)
      this.choose_bill--
  }
  next(){
    if (this.choose_bill<this.bills[this.tab_status].length-1)
      this.choose_bill++
  }

  async confirmBill(){
    const bill = {...this.bills[this.tab_status][this.choose_bill]}

    if (await this.updateStatus(bill.status+1,bill.id)=='success'){
      bill.status++
      this.bills[this.tab_status].splice(this.choose_bill,1)
      // console.log(bill,this.bills[bill.status+""]);
      if (!this.bills[bill.status]){
        this.bills[bill.status]=[bill]
      }
      else this.bills[bill.status].push(bill)

      // while (this.bills[this.tab_status].length==0&&this.tab_status<2) this.tab_status++

    }
  }

  async submitCancelBill(){

    if (!this.comment) {
      this.main.createNotification("info","Vui lòng nhập lý do hủy")
      return
    }
    this.isFormCancel = false
    const bill = {...this.bills[this.tab_status][this.choose_bill]}

    if (await this.updateStatusForCancelBill(this.comment,bill.id)=='success'){
      bill.status=4
      bill.comment = this.comment
      this.bills[this.tab_status].splice(this.choose_bill,1)
      if (!this.bills[bill.status]){
        this.bills[bill.status]=[bill]
      }
      else this.bills[bill.status].push(bill)

      // while (this.bills[this.tab_status].length==0&&this.tab_status<2) this.tab_status++

    }
  }

  updateStatus(status:any,bid:any):Promise<any>{
    return new Promise((resolve, reject) => {
      this.crud.put("bill/status",{id:bid,status:status}).then(res=>res.json()).then(data=>{
        if(data.result=='success'){
          this.main.createNotification("success",`Trạng thái của hóa đơn ${bid} đã được cập nhật`)
          resolve('success')

        }
        else{
          this.main.createNotification("info",`Cập nhật hóa đơn thất bại`)
          resolve('fail')
        }
      })

    });


  }

  updateStatusForCancelBill(comment:any,bid:any):Promise<any>{
    return new Promise((resolve, reject) => {
      this.crud.put("bill/status/cancel",{id:bid,comment:comment}).then(res=>res.json()).then(data=>{
        if(data.result=='success'){
          this.main.createNotification("success",`Hóa đơn ${bid} đã được bị hủy`)
          resolve('success')

        }
        else{
          this.main.createNotification("info",`Hủy hóa đơn thất bại`)
          resolve('fail')
        }
      })

    });


  }

  cancel(){
    this.isFormCancel = false
  }

  openFOrmConFirmCancel(){
    this.isFormCancel=true
    this.comment = ''
  }



}
