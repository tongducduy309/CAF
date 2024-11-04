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


  constructor (private userS:UserService, private router:Router, private crud:CrudService, private main:MainService){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
   {
        // Route change detected
        this.checkUser(event.urlAfterRedirects)
        switch (event.urlAfterRedirects){
          case '/home':
            this.bg_header = 'transparent'
            break
          case '/cart':
            this.btnShowCart = false
            break
          case '/checkout':
            this.btnShowCart = false
            break

          default:
            this.bg_header = '#000'
        }
      }
    });
  }
  ngOnInit(): void {
    this.getCategories();


  }

  async checkUser(path:string){
    if (this.user==null){
      if (path!='/account/login'&&path!='/account/reset-your-password'&&path!='/account/register'){
        this.user = await this.getUser();

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

  changeQuantityItem(item:any){
    //this.itemsCart = this.itemsCart.filter((ite:any)=>!(ite.pid==item.pid))
    this.QuantityEmitter.emit(item)


  }

  logout(){
    this.userS.logout()
    this.user = null
  }

}
