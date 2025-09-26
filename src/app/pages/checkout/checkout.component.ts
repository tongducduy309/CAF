import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleService } from 'src/app/services/page-title.service';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';
import { UserService } from 'src/services/user.service';
import { Location } from '@angular/common';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
    standalone: false
})
export class CheckoutComponent implements OnInit {

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

  processing = false

  inCart = false

  total = 0

  @Output() totalEmitter = new EventEmitter()

  private pageTitle = inject(PageTitleService);
  layoutService = inject(LayoutService)

  constructor (private crud:CrudService, private route: ActivatedRoute, private router:Router, public main:MainService, private userS:UserService,
    private location:Location
  ){
    
  }

  back(){
    this.location.back();
  }




  async ngOnInit(): Promise<void> {
    this.pageTitle.setTitle('CHECKOUT.TITLE');
    this.route.queryParamMap.subscribe(params => {
      const quantity = parseInt(params.get('quantity')||'0')
      const productId = params.get('productId')
      const note = params.get('note')
      if (quantity&&productId){
        this.inCart=false
        this.crud.get('product',productId!).subscribe((res:any)=>{
          // console.log(products);
          const product = res.data
          this.products.push({...product,quantity:quantity,note:note})
          this.cal_Info_list()
        })
      }
      else{
        this.getItemsCart()
        this.inCart=true
      }
    });



  }

  getItemsCart(){
    this.crud.get("cart",this.user.id).subscribe((response:any)=>{
      this.products = response.data
      this.cal_Info_list()

    })

  }

  cal_Info_list(){
    for (let product of this.products){
      this.total+=product.quantity
      this.bill.subtotal += (product.quantity||0) * this.main.getPrice(product)
    }
    this.bill.delivery_fee = (this.bill.subtotal>=200000)?0:10000
    this.bill.discount = 0
    this.bill.cost = this.bill.subtotal+this.bill.delivery_fee
    this.bill.cost -= this.bill.cost*this.bill.discount/100
    this.bill.paymentmethod = '1'
  }


  async getUser():Promise<any>{

    return new Promise(async (resolve, reject) => {
      const user = this.main.getCookie("u-caf")

      if(user){
        const result = await this.userS.getUser(null,null,user.token)
        if (result){
          if (result.result=='Success'){
            resolve({id:result.id,email:result.email,fullname:result.fullname,role:result.role})
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
    else{
      this.processing = true
      let total = 0

      for (let p of this.products){
        total+=p.quantity*1
      }

      if (this.bill.products.length==0){
        this.main.createNotification("info","Thanh toán thất bại")
        return
      }
      this.crud.addData("checkout",{
        user:{
          ...this.address_user_choosing,
          email:this.user.email,
          fullname:this.user.fullname,
          id:this.user.id
        },
        bill:{
          ...this.bill,
          id:this.main.createID(),
          products:this.products,
          payment_status:this.bill.paymentmethod==2,
          total:total
        },
        inCart:this.inCart
      }).then(res=>res.json()).then(data=>{
        console.log(data);
        if (data.result=='success'){
          this.main.createNotification("success","Thanh toán thành công")
          this.totalEmitter.emit(0)
          this.router.navigate(['orders'])
        }
        else{
          this.main.createNotification("info","Thanh toán thất bại")
        }
        this.processing = false
      })
    }
  }

  verifyCode(){
   if (this.code_gift.trim().length>0){
    this.crud.get("voucher",this.code_gift).subscribe((res:any)=>{
      if (res.result=='success'){
        const row = res.data
        this.bill.discount = row.discount
        this.bill.cost = this.bill.subtotal+this.bill.delivery_fee
        this.bill.cost -= this.bill.cost*this.bill.discount/100
        this.main.createNotification("success",`Đang sử dụng mã giảm giá ${this.bill.discount}%`)
      }
      else{
        this.main.createNotification("info","Mã giảm giá không tồn tại hoặc đã hết hạn")
      }
    })
   }else{
    this.bill.discount = 0
    this.bill.cost = this.bill.subtotal+this.bill.delivery_fee
   }
  }



}
