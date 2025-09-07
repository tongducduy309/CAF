import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/classes/page';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-detail-bill',
    templateUrl: './detail-bill.component.html',
    styleUrls: ['./detail-bill.component.scss'],
    standalone: false
})
export class DetailBillComponent extends Page{
  bill:any = null

  constructor(private route: ActivatedRoute, private crud:CrudService, private main:MainService, private location:Location){
    super()
    this.route.paramMap.subscribe(async (params) => {
      const bid = params.get('bid')
      this.getBill(bid)
    });
  }

  back(){
    this.location.back();
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
            this.loaded()
            return;
          }
        }
        this.main.createNotification("info","Mã hóa đơn không tồn tại")
      })
    }else{

    }
  }


}
