import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/classes/page';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-detail-bill',
  templateUrl: './detail-bill.component.html',
  styleUrls: ['./detail-bill.component.scss']
})
export class DetailBillComponent extends Page implements AfterViewInit {
  bill:any = {}

  constructor(private route: ActivatedRoute, private crud:CrudService, public main:MainService){
    super()
    this.route.paramMap.subscribe(async (params) => {
      const bid = params.get('bid')
      this.getBill(bid)
    });
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
            return;
          }
        }
        this.main.createNotification("info","Mã hóa đơn không tồn tại")
      })
    }else{

    }
  }
}
