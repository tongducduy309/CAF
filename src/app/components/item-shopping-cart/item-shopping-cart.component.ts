import { Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
export class ItemShoppingCartComponent{

  @Input() item:any = {}

  



  FILE_URL = environment.variable_global.FILE_URL;

  cartService = inject(CartService)

  

  constructor(private router:Router, public main:MainService, private crud:CrudService, private translate: TranslateService){

  }

  remote(s:any){
    console.log(s);
    this.router.navigate([s])
  }

  remove(){
    this.cartService.removeItemById(this.item.id).then(()=>{
     
      this.main.createNotification("success",this.translate.instant('NOTIFICATION.SUCCESS.REMOVE_ITEM_IN_CART' ))
    
      
    }).catch((e)=>{
      console.error(e.message)
      this.main.createNotification("error",this.translate.instant('NOTIFICATION.ERROR.CALL_API' ))
    })
  }

  changeQuantity(quantity:number){
    this.item.quantity = quantity
    this.updateQuantity()
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
