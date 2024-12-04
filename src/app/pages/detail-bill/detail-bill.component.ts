import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/classes/page';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-bill',
  templateUrl: './detail-bill.component.html',
  styleUrls: ['./detail-bill.component.scss']
})
export class DetailBillComponent extends Page implements AfterViewInit {
  bill:any = {}

  constructor(private route: ActivatedRoute, private crud:CrudService, public main:MainService, private location:Location){
    super()
    this.route.paramMap.subscribe(async (params) => {
      const bid = params.get('bid')
      this.getBill(bid)
    });
  }

  back(){
    this.location.back();
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(()=> {
      // this.getUser()
      this.loaded()
    })

  }

  getBill(bid:any){
    const user = this.main.getCookie("u-caf")
    if (user){
      console.log(bid,user.uid);
      this.crud.get("bill",`${bid}/${user.uid}`).subscribe((res:any)=>{
        if (res.result=='success'){
          console.log(res);
          if (res.data){
            this.bill = res.data
            switch (this.bill.status){
              case 1:
                this.bill.status = 'Đang pha chế'
                this.bill.status_color = 'orange'
                break;
              case 2:
                this.bill.status = 'Đang giao hàng'
                this.bill.status_color = 'purple'
                break;
              case 3:
                this.bill.status = 'Đã nhận'
                this.bill.status_color = 'green'
                break;
              case 4:
                this.bill.status = 'Hủy'
                this.bill.status_color = 'red'
                break;
              default:
                this.bill.status = 'Chờ xác nhận'
                this.bill.status_color = 'blue'
            }
            return;
          }
        }
        this.main.createNotification("info","Mã hóa đơn không tồn tại")
      })
    }else{

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
