import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  processing = false

  inCart = false

  @Output() totalEmitter = new EventEmitter()

  constructor (private crud:CrudService, private route: ActivatedRoute, private router:Router, public main:MainService, private userS:UserService){
    super()
    this.must_load = 2
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(()=> {
    })
  }

  async ngOnInit(): Promise<void> {
    await this.checkUser()
    this.route.queryParamMap.subscribe(params => {
      const quantity = parseInt(params.get('quantity')||'0')
      const id = params.get('id')
      const note = params.get('note')
      if (quantity&&id){
        this.inCart=false
        this.crud.get('product',id!).subscribe((res:any)=>{
          // console.log(products);
          const product = res.data
          this.products.push({...product,quantity:quantity,note:note})
          this.cal_Info_list()
          this.loaded()
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
      this.loaded()

    })

  }

  cal_Info_list(){
    for (let product of this.products){
      this.bill.subtotal += (product.quantity||0) * this.main.getPrice(product)
    }
    this.bill.delivery_fee = (this.bill.subtotal>=200000)?0:10000
    this.bill.discount = 0
    this.bill.cost = this.bill.subtotal+this.bill.delivery_fee
    this.bill.cost -= this.bill.cost*this.bill.discount/100
    this.bill.paymentmethod = '1'
  }



  async checkUser(){
    this.user = await this.getUser();
    console.log(this.user);
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
      const user = this.main.getCookie("u-caf")

      if(user){
        const result = await this.userS.getUser(null,null,user.token)
        if (result){
          if (result.result=='Success'){
            resolve({id:result.id,email:result.email,fullname:result.fullname})
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
          payment_status:this.bill.paymentmethod==2
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
   if (this.code_gift.trim()){
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
