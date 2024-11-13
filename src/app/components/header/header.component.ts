import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Input() itemsCart:any = []
  @Input() total = 0
  @Input() subtotal = 0
  @Output() itemsCartChange = new EventEmitter();
  @Output() totalChange = new EventEmitter();
  @Output() subtotalChange = new EventEmitter();
  @Input() user:any=null;
  @Output() userChange = new EventEmitter();
  @Output() QuantityEmitter = new EventEmitter()

  @ViewChild('process') process: any;
  bg_header = '#000'
  btnShowCart = true

  categories: any = {}

  freeShip = 200000

  isSearing:any;


  constructor (private userS:UserService, private router:Router, private crud:CrudService, public main:MainService){

  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
   {
        // Route change detected
        this.checkUser(event.urlAfterRedirects)
        switch (event.urlAfterRedirects){
          case '/home':
            this.bg_header = 'transparent'
            this.btnShowCart = true
            break
          case '/cart':
            this.bg_header = '#000'
            this.btnShowCart = false
            break
          case '/checkout':
            this.bg_header = '#000'
            this.btnShowCart = false
            break

          default:
            this.bg_header = '#000'
            this.btnShowCart = true
        }
      }
    });
    this.getCategories();


  }

  async checkUser(path:string){
    if (this.user==null){
      if (path!='/account/login'&&path!='/account/reset-your-password'&&path!='/account/register'){
        this.user = await this.getUser();
        this.userChange.emit(this.user)

      }
      else{
        this.user = await this.getUser();
          if (this.user!=null){
            this.remote('')
          }
      }
    }
  }

  async getUser():Promise<any>{

    return new Promise(async (resolve, reject) => {
      const token = this.main.getCookie("u-caf")

      if(token){
        const result = await this.userS.getUser(null,null,token)
        if (result){
          if (result.result=='Success'){
            resolve({id:result.id})
          }
        }
        resolve(null)


      }


    });


  }



  getCategories(){
    this.crud.get("categories","group-by-type").subscribe((categories:any)=>{
      this.categories=categories
      console.log(categories);

    })
  }
  account(){
    if (this.userS.isVerify==false){
      this.router.navigate(["account/login"])
    }
  }

  visible = false;
  isPromoCode:any = -1;
  isGift:any = -1;
  checkedGift = false;


  open(): void {

    if (this.user){
      this.visible = true;
    }
    else{
      this.main.createNotification("info","Đăng nhập để mở giỏ hàng")
    }

  }

  close(): void {
    this.visible = false;
  }

  remote(page:any){
    this.router.navigate([page])
    this.visible = false;
  }

  openSearch(){
    document.body.style.overflow = 'hidden'
    this.isSearing=true
  }

  closeSearch(){
    document.body.style.overflow = 'auto'
    this.isSearing=false
  }

  // changeQuantityItem(item:any){
  //   this.itemsCart = this.itemsCart.filter((ite:any)=>!(ite.pid==item.pid))



  // }

  changeQuantityItem(item:any){
    this.total = 0
    this.subtotal=0

    for (let ite of this.itemsCart){
      if (item.id==ite.id){
        ite.quantity = item.quantity
      }
      this.total+=ite.quantity*1
      this.subtotal+=ite.quantity*this.main.getPrice(ite)
    }
    if (item.quantity==0){
      this.itemsCart = this.itemsCart.filter((ite:any)=>!(ite.pid==item.pid))
    }
    this.itemsCartChange.emit(this.itemsCart)
    this.subtotalChange.emit(this.subtotal)
    this.totalChange.emit(this.total)
    console.log(this.subtotal,this.total);

    // this.putItemCartToSession(this.itemsCart)

  }

  logout(){
    this.userS.logout()
    this.user = null
  }

}
