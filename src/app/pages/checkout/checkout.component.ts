import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/classes/page';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent extends Page implements OnInit, AfterViewInit {

  user:any = {
    card:{
      serial:'',
      code:'',
      date:''
    }
  }

  bill:any = {
    ship:0,
    subtotal:0,
    cost:0
  }

  code_gift = ''

  products: any = []

  address_user_choosing:any = null

  isMannageAddress = false

  constructor (private crud:CrudService, private route: ActivatedRoute, private router:Router, public main:MainService, private userS:UserService){
    super()
    this.must_load = 2
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
          this.bill.subtotal = (quantity||0) * this.main.getPrice(product)
          this.bill.ship = 0
          this.bill.discount = 0
          this.bill.cost = this.bill.subtotal+this.bill.ship
          this.bill.methodPayment = '1'
          this.loaded()
        }
      })
    });

    this.checkUser()

  }



  async checkUser(){
    this.user = await this.getUser();
    if (!this.user)
    {
      this.router.navigate([''])
    }
    else{
      this.user = {...this.user,card:{
        serial:'',
        code:'',
        date:''
      }}
      this.loaded()
      // this.getAddressOfUser()
    }

  }

  async getUser():Promise<any>{

    return new Promise(async (resolve, reject) => {
      const token = this.main.getCookie("u-caf")

      if(token){
        const result = await this.userS.getUser(null,null,token)
        if (result){
          if (result.result=='Success'){
            resolve({id:result.id,email:result.email})
          }
        }
        resolve(null)


      }


    });


  }

  chooseAddress(a:any){
    this.address_user_choosing = a
    this.isMannageAddress=false
  }

  submit(){
    if (!this.address_user_choosing){
      this.main.createNotification("info","Cung cấp thêm thông tin giao hàng")
      this.isMannageAddress=true
    }
  }

}
