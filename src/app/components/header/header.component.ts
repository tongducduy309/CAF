import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';
import { LangService } from 'src/app/services/lang.service';
import { BreakpointService } from 'src/app/services/breakpoint.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit{
  itemsCart:any = []
  @Input() total = 0
  @Output() totalChange = new EventEmitter()
  subtotal = 0
  @Input() user:any=null;
  @Output() userChange = new EventEmitter();

  bg_header = '#000'
  btnShowCart = true

  categories: any = {}

  freeShip = 200000

  isSearing:any;

  loading = true

  visibleCart = false

  @Input() visible = true

  isDesktop = true

  private lang = inject(LangService);


  constructor (private userS:UserService, private router:Router, private crud:CrudService, public main:MainService,private breakpointService: BreakpointService){

  }
  ngOnInit(): void {
    this.breakpointService.isDesktop$.subscribe(isDesktop => {
      this.isDesktop = isDesktop;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
    {
        // Route change detected
        console.log(event.url);
        const s = event.url.split("/")[1]

        switch (s){
          case 'home':
            this.bg_header = 'transparent'
            this.btnShowCart = true
            this.visible=true
            break
          case 'cart':
          case 'checkout':
            this.bg_header = '#000'
            this.btnShowCart = false
            this.visible=true
            break
          case 'dashboard':
            this.visible = false
            break

          default:
            this.bg_header = '#000'
            this.btnShowCart = true
            this.visible=true
        }

        if(s!='dashboard')this.checkUser(event.urlAfterRedirects)
      }
    });

    this.getCategories();


  }

  async checkUser(path:string){
    if (this.user==null){
      if (path!='/account/login'&&path!='/account/reset-your-password'&&path!='/account/register'){
        this.user = await this.getUser();

        if (this.user!=null){
          this.getItemsCart()
          this.userChange.emit(this.user)
        }

      }
      else{
        this.user = await this.getUser();
          if (this.user!=null){
            this.remote('')
            this.getItemsCart()
            this.userChange.emit(this.user)
          }

      }
    }
  }

  async getUser():Promise<any>{

    return new Promise(async (resolve, reject) => {
      const user = this.main.getCookie("u-caf")
      // console.log(user);
      if(user){
        const result = await this.userS.getUser(null,null,user.token)
        if (result){
          if (result.result=='Success'){
            resolve({id:result.id,role:result.role})
          }
        }
        resolve(null)


      }


    });


  }



  getCategories(){
    this.crud.get("categories","all").subscribe((res:any)=>{
      if (res.result='success'){
        this.categories=res.data
        console.log(this.categories);
      }


    })
  }
  account(){
    if (this.userS.isVerify==false){
      this.router.navigate(["account/login"])
    }
  }

  // visible = false;
  isPromoCode:any = -1;
  isGift:any = -1;
  checkedGift = false;


  open(): void {
    if (this.user){
      this.visibleCart = true;
      this.getItemsCart()
    }
    else{
      this.main.createNotification("info","Đăng nhập để mở giỏ hàng")
    }

  }

  close(): void {
    this.visibleCart = false;
  }

  remote(page:any){
    this.router.navigate([page])
    this.visibleCart = false;
  }

  openSearch(){
    document.body.style.overflow = 'hidden'
    this.isSearing=true
  }

  closeSearch(){
    document.body.style.overflow = 'auto'
    this.isSearing=false
  }

  getItemsCart(){
    this.crud.get("cart",this.user.id).subscribe((response:any)=>{
      this.itemsCart = response.data
      this.cal_Info_Cart()
      // this.itemsCartChange.emit(this.itemsCart)


    })

  }

  changeQuantityItemInCart(item:any){
    for (let i of this.itemsCart){
      if (i.id==item.id){
        i.quantity = item.quantity
        break
      }
    }
    this.cal_Info_Cart()

  }

  removeItemInCart(data:any){
    const id = data.id

    this.crud.delete("cart",id).subscribe((res:any)=>{
      console.log(res);
      if (res.result=='success'){
        const quantity = data.quantity
        this.itemsCart = this.itemsCart.filter((ite:any)=>ite.id!=id)
        this.total-=quantity


      }
      else{
        this.main.createNotification("error","Xóa sản phẩm khỏi giỏ hàng không thành công")
      }
    })
  }

  // changeQuantityItem(item:any){
  //   this.itemsCart = this.itemsCart.filter((ite:any)=>!(ite.pid==item.pid))



  // }

  cal_Info_Cart(){
    this.total = 0
    this.subtotal=0

    for (let ite of this.itemsCart){
      this.total+=ite.quantity*1
      this.subtotal+=ite.quantity*this.main.getPrice(ite)
    }
    this.totalChange.emit(this.total)
    this.loading=false
    // if (item.quantity==0){
    //   this.itemsCart = this.itemsCart.filter((ite:any)=>!(ite.pid==item.pid))
    // }
    // this.itemsCartChange.emit(this.itemsCart)
    // this.subtotalChange.emit(this.subtotal)
    // this.totalChange.emit(this.total)
    // console.log(this.subtotal,this.total);

    // this.putItemCartToSession(this.itemsCart)

  }

  logout(){
    this.userS.logout()
    this.user = null
    this.total = 0
  }


  switch(l: 'vi'|'en') { this.lang.use(l); }

  get cur() { return this.lang.current(); }

}
