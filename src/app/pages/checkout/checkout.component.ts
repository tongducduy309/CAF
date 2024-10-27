import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/classes/page';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent extends Page implements OnInit, AfterViewInit {

  user:any = {}

  bill:any = {}

  products: any = []

  address_user_choosing:any = {}

  isMannageAddress = false

  constructor (private crud:CrudService, private route: ActivatedRoute, private router:Router, private main:MainService){
    super()

  }

  ngAfterViewInit(): void {
    Promise.resolve().then(()=> {

    })
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const quantity = parseInt(params.get('quantity')||'0')
      const id = params.get('id')
      if (!quantity||!id) {
        this.router.navigate([''])
      }
      this.crud.get('products/ids',params.get('id')+"").subscribe((products:any)=>{
        if (products.length==1){
          const product = products[0]
          this.products.push({...product,quantity:quantity})
          console.log(this.main.getPrice(product));
          this.bill.subtotal = (quantity||0) * this.main.getPrice(product)
          this.bill.ship = 0
          this.bill.discount = 0
          this.bill.cost = this.bill.subtotal+this.bill.ship
          this.loaded()
        }
      })
    });
  }

  chooseAddress(a:any){
    this.address_user_choosing = a
    this.isMannageAddress=false
  }

}
