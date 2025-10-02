import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';
import { Location } from '@angular/common';
import { OrderService } from 'src/app/services/order.service';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
    selector: 'app-detail-bill',
    templateUrl: './detail-bill.component.html',
    styleUrls: ['./detail-bill.component.scss'],
    standalone: false
})
export class DetailBillComponent{
  order:any = null

  layoutService = inject(LayoutService)
  orderService = inject(OrderService)

  constructor(private route: ActivatedRoute, private crud:CrudService, private main:MainService, private location:Location){

    this.route.paramMap.subscribe(async (params) => {
      const bid = params.get('bid')
      if (bid){
        this.getOrder(+bid)
      }
    });
  }

  back(){
    this.location.back();
  }


  getOrder(id:number){
    this.orderService.getDetailOrder(id).then((res)=>{
      this.order = res
      console.log(this.order)
      this.layoutService.setReady()
    }).catch((err)=>{
      console.error(err)
      this.main.createNotification("error",err.message)
    });
  }


}
