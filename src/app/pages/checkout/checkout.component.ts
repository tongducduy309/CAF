import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleService } from 'src/app/services/page-title.service';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';
import { Location } from '@angular/common';
import { LayoutService } from 'src/app/services/layout.service';
import { CartService } from 'src/app/services/cart.service';
import { TranslateService } from '@ngx-translate/core';
import { CartResponse } from 'src/app/dto/response/cart.response';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CreateOrderRequest, OrderItemRequest } from 'src/app/dto/request/order.request';
import { OrderType } from 'src/app/enums/Order.enum';
import { PaymentMethod } from 'src/app/enums/Payment.enum';

interface IUser{
  info:User|null,
  card: {
      serial?: string,
      code?: string,
      date?: string
    }
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: false
})


export class CheckoutComponent implements OnInit {

  orderId = '6';
  amount = 199000;

  user: IUser = {
    info: null,
    card: {
      serial: "",
      code: "",
      date: ""
    }
  }

  bill: any = {
    ship: 0,
    subtotal: 0,
    cost: 0
  }

  code_gift = ''

  products: CartResponse[] = []

  address_user_choosing: any = null

  isMannageAddress = false

  processing = false

  inCart = false

  total = 0

  @Output() totalEmitter = new EventEmitter()

  private pageTitle = inject(PageTitleService);
  layoutService = inject(LayoutService);
  cartService = inject(CartService)
  translate = inject(TranslateService)
  userService = inject(UserService)
  checkoutService = inject(CheckoutService)

  constructor(private crud: CrudService, private route: ActivatedRoute, private router: Router, public main: MainService,
    private location: Location
  ) {

  }

  back() {
    this.location.back();
  }

  toOrderItem():OrderItemRequest[]{
    const items:OrderItemRequest[] = this.products.map((product:CartResponse)=>{
      return{
        productVariantId:product.productVariant.id,
        quantity:product.quantity,
        note:product.note
      } as OrderItemRequest
    })
    return items
  }

  payNow() {
    // this.pay.createVnpaySession({
    //   orderId: this.orderId,
    //   amount: this.amount,
    //   orderInfo: 'Thanh toan don hang ' + this.orderId
    // }).subscribe({
    //   next: ({ payUrl }) => {
    //     // Redirect sang trang thanh toán của VNPay
    //     window.location.replace(payUrl); // dùng replace để tránh quay lại trang create
    //   },
    //   error: () => {  /* show toast lỗi */ }
    // });
    this.checkoutService.createOrder({
      userId:this.user.info?.id,
      orderType:OrderType.PICKUP,
      paymentMethod:PaymentMethod.EWALLET,
      note:"",
      items: this.toOrderItem()
    } as CreateOrderRequest).then((payUrl:string)=>{
      // console.log(payUrl)
      window.location.replace(payUrl);
    })
  }




  async ngOnInit(): Promise<void> {
    
    this.pageTitle.setTitle('CHECKOUT.TITLE');
    (await this.userService.getProfile()).subscribe((res:User|null)=>{
      if (this.user){
        this.user.info = res
        console.log(this.user);
      }
    })
 
    this.route.queryParamMap.subscribe(async params => {
      const quantity = parseInt(params.get('quantity') || '0')
      const productVariantId = params.get('productVariantId') || ""
      const note = params.get('note') || ''
      if (quantity && productVariantId) {
        this.inCart = false

        this.cartService.getDetailProduct(productVariantId, quantity, note).then((res: CartResponse) => {
          this.products.push(res)
          this.cal_Info_list()
        })
          .catch((e) => {
            console.error(e.message)
            this.main.createNotification("error", this.translate.instant('NOTIFICATION.ERROR.CALL_API'))
          }).finally(()=>{
            this.layoutService.setReady()
          })
      }
      else {
        (await this.cartService.getMyCart()).subscribe((data:any)=>{
          // console.log(data)
          this.products = data.data
          if (this.products.length==0) this.router.navigate([''])
          this.cal_Info_list()
        },()=>{},()=>{this.layoutService.setReady()});
        
        this.inCart = true
      }
    });



  }

  cal_Info_list() {
    for (let product of this.products) {
      this.total += product.quantity
      this.bill.subtotal += (product.quantity || 0) * product.productVariant.price
    }
    this.bill.delivery_fee = (this.bill.subtotal >= 200000) ? 0 : 10000
    this.bill.discount = 0
    this.bill.cost = this.bill.subtotal + this.bill.delivery_fee
    this.bill.cost -= this.bill.cost * this.bill.discount / 100
    this.bill.paymentmethod = '1'
  }



  chooseAddress(a: any) {
    this.address_user_choosing = a
    this.isMannageAddress = false
  }

  submit() {
    if (!this.address_user_choosing) {
      this.main.createNotification("info", "Cung cấp thêm thông tin giao hàng")
      this.isMannageAddress = true
    }
    else {
      this.processing = true
      let total = 0

      for (let p of this.products) {
        total += p.quantity * 1
      }

      if (this.bill.products.length == 0) {
        this.main.createNotification("info", "Thanh toán thất bại")
        return
      }
      // this.crud.addData("checkout", {
      //   user: {
      //     ...this.address_user_choosing,
      //     email: this.user.email,
      //     fullname: this.user.fullname,
      //     id: this.user.id
      //   },
      //   bill: {
      //     ...this.bill,
      //     id: this.main.createID(),
      //     products: this.products,
      //     payment_status: this.bill.paymentmethod == 2,
      //     total: total
      //   },
      //   inCart: this.inCart
      // }).then(res => res.json()).then(data => {
      //   console.log(data);
      //   if (data.result == 'success') {
      //     this.main.createNotification("success", "Thanh toán thành công")
      //     this.totalEmitter.emit(0)
      //     this.router.navigate(['orders'])
      //   }
      //   else {
      //     this.main.createNotification("info", "Thanh toán thất bại")
      //   }
      //   this.processing = false
      // })
    }
  }

  verifyCode() {
    if (this.code_gift.trim().length > 0) {
      this.crud.get("voucher", this.code_gift).subscribe((res: any) => {
        if (res.result == 'success') {
          const row = res.data
          this.bill.discount = row.discount
          this.bill.cost = this.bill.subtotal + this.bill.delivery_fee
          this.bill.cost -= this.bill.cost * this.bill.discount / 100
          this.main.createNotification("success", `Đang sử dụng mã giảm giá ${this.bill.discount}%`)
        }
        else {
          this.main.createNotification("info", "Mã giảm giá không tồn tại hoặc đã hết hạn")
        }
      })
    } else {
      this.bill.discount = 0
      this.bill.cost = this.bill.subtotal + this.bill.delivery_fee
    }
  }



}
