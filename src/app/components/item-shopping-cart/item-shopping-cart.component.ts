import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, fromEvent, map } from 'rxjs';
import { UpdateQuantityCartRequest } from 'src/app/dto/request/cart.request';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
    selector: 'app-item-shopping-cart',
    templateUrl: './item-shopping-cart.component.html',
    styleUrls: ['./item-shopping-cart.component.scss'],
    standalone: false
})
export class ItemShoppingCartComponent implements OnInit,AfterViewInit{

  @Input() item:any = {}
  @Output() onRemove = new EventEmitter<string>();

  @ViewChild('btnPlus') btnPlus!: ElementRef;
  @ViewChild('btnSub') btnSub!: ElementRef;



  FILE_URL = environment.variable_global.FILE_URL;

  cartService = inject(CartService)

  

  constructor(private router:Router, public main:MainService, private crud:CrudService, private translate: TranslateService){

  }
  ngAfterViewInit(): void {

    // Promise.resolve().then(()=> {

    // })
    this.event()
  }

  ngOnInit(): void {
    // console.log(this.item);

  }

  remote(s:any){
    console.log(s);
    this.router.navigate([s])
  }

  remove(){
    this.cartService.removeItemById(this.item.id).then(()=>{
     
      this.main.createNotification("success",this.translate.instant('NOTIFICATION.SUCCESS.REMOVE_ITEM_IN_CART' ))
      this.onRemove.emit(this.item.id)
    
      
    }).catch((e)=>{
      console.error(e.message)
      this.main.createNotification("error",this.translate.instant('NOTIFICATION.ERROR.CALL_API' ))
    })
  }

  changeQuantity(){
    this.item.quantity = this.item.quantity.replace(/\D/g, '');
    if(this.item.quantity<1)
      this.item.quantity=1
    if(this.item.quantity>99)
      this.item.quantity=99
    this.updateQuantity()
  }

  subQuantity(){
    if (this.item.quantity>1)
    {
      this.item.quantity--;
    }

  }

  addQuantity(){

    if (this.item.quantity<99){
      this.item.quantity++;
    }


  }

  event(){
    const plus = this.btnPlus.nativeElement as HTMLDivElement;
    const sub = this.btnSub.nativeElement as HTMLDivElement;

    fromEvent(plus, 'click')
  .pipe(
    debounceTime(300),
    map((event: any) => event.target)
  )
  .subscribe(value => {
    if (this.item.quantity<=99){

      this.updateQuantity()
    }
  });

  fromEvent(sub, 'click')
  .pipe(
    debounceTime(300),
    map((event: any) => event.target)
  )
  .subscribe(value => {
    if (this.item.quantity>0){
      this.updateQuantity()
    }
  });
  }

  updateQuantity(){
    this.cartService.updateQuantityInCart(this.item.id,{
      productVariantId:this.item.productVariant.id,
      quantity:this.item.quantity
    } as UpdateQuantityCartRequest).then(()=>{}).catch((e)=>{
      console.error(e.message)
      this.main.createNotification("error",this.translate.instant('NOTIFICATION.ERROR.CALL_API' ))
    })
  }
}
