import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';
import { LangService } from 'src/app/services/lang.service';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { filter, map } from 'rxjs';
import { CartResponse } from 'src/app/dto/response/cart.response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit {
  auth = inject(AuthenticationService)
  user$ = this.auth.user$;

  cartService = inject(CartService)
  cart$ = this.cartService.cart$;


  @Input() isBackgroundTransparent = false
  @Input() total = 0
  @Output() totalChange = new EventEmitter()
  subtotal = 0
  @Input() user: any = null;
  @Output() userChange = new EventEmitter();

  btnShowCart = true

  categories: any = {}

  freeShip = 200000

  isSearing: any;

  loading = true

  visibleCart = false

  @Input() visible = true

  isDesktop = true

  private lang = inject(LangService);

  isMenu = false;


  constructor(private userS: UserService, private router: Router, private crud: CrudService, public main: MainService, private breakpointService: BreakpointService) {

  }
  async ngOnInit(): Promise<void> {
    (await this.auth.fetchProfile()).subscribe();
    (await this.cartService.getMyCart()).subscribe();
    this.breakpointService.isDesktop$.subscribe(isDesktop => {
      this.isDesktop = isDesktop;
    });


    this.getCategories();


  }

  async getUser(): Promise<any> {

    return new Promise(async (resolve, reject) => {
      const user = this.main.getCookie("u-caf")
      // console.log(user);
      if (user) {
        const result = await this.userS.getUser(null, null, user.token)
        if (result) {
          if (result.result == 'Success') {
            resolve({ id: result.id, role: result.role })
          }
        }
        resolve(null)


      }


    });


  }



  getCategories() {
    this.crud.get("categories", "all").subscribe((res: any) => {
      if (res.result = 'success') {
        this.categories = res.data
        console.log(this.categories);
      }


    })
  }
  profile() {
    this.router.navigate(["account"])
  }

  // visible = false;
  isPromoCode: any = -1;
  isGift: any = -1;
  checkedGift = false;


  open(): void {
    this.visibleCart = true;
    this.getItemsCart()

  }

  close(): void {
    this.visibleCart = false;
  }

  remote(page: any) {
    this.router.navigate([page])
    this.visibleCart = false;
    this.isMenu = false;
  }

  openSearch() {
    document.body.style.overflow = 'hidden'
    this.isSearing = true
  }

  closeSearch() {
    document.body.style.overflow = 'auto'
    this.isSearing = false
  }

  getItemsCart() {
    // this.crud.get("cart",this.user.id).subscribe((response:any)=>{
    //   this.itemsCart = response.data
    //   this.cal_Info_Cart()
    //   // this.itemsCartChange.emit(this.itemsCart)


    // })

  }

  changeQuantityItemInCart(item: any) {
    // for (let i of this.itemsCart){
    //   if (i.id==item.id){
    //     i.quantity = item.quantity
    //     break
    //   }
    // }
    // this.cal_Info_Cart()

  }

  // removeItemInCart(id: string) {
  //   this.cart$ = this.cart$.pipe(
  //     map((items: CartResponse[]) => items.filter(item => item.id !== id))
  //   );
  // }

  // changeQuantityItem(item:any){
  //   this.itemsCart = this.itemsCart.filter((ite:any)=>!(ite.pid==item.pid))



  // }

  cal_Info_Cart() {
    // this.total = 0
    // this.subtotal=0

    // for (let ite of this.itemsCart){
    //   this.total+=ite.quantity*1
    //   this.subtotal+=ite.quantity*this.main.getPrice(ite)
    // }
    // this.totalChange.emit(this.total)
    // this.loading=false
    // if (item.quantity==0){
    //   this.itemsCart = this.itemsCart.filter((ite:any)=>!(ite.pid==item.pid))
    // }
    // this.itemsCartChange.emit(this.itemsCart)
    // this.subtotalChange.emit(this.subtotal)
    // this.totalChange.emit(this.total)
    // console.log(this.subtotal,this.total);

    // this.putItemCartToSession(this.itemsCart)

  }

  logout() {
    this.auth.logout(true)
    this.total = 0
  }


  switch(l: 'vi' | 'en') { this.lang.use(l); }

  get cur() { return this.lang.current(); }

}
