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
            this.bg_header = '#000';
        }
      }
    });
  }
  ngOnInit(): void {
    this.getCategories();
    this.getUser();

  }

  async getUser(){
    let token = this.main.getCookie("u-caf")
    if(token){

      this.user=await this.userS.login_method_1(token)
      // console.log(this.user);
    }
  }



  getCategories(){
    this.crud.get("categories","all").subscribe((categories:any)=>{
      this.categories.drinks = categories.filter((category:any)=>category.type==0)
      this.categories.food = categories.filter((category:any)=>category.type==1)
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
    this.visible = true;

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
