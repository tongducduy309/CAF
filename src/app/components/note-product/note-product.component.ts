import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CartRequest, ProductInCartRequest } from 'src/app/dto/request/cart.request';
import { CartService } from 'src/app/services/cart.service';
import { MainService } from 'src/services/main.service';


@Component({
  selector: 'app-note-product',
  templateUrl: './note-product.component.html',
  styleUrls: ['./note-product.component.scss'],
  standalone: false
})

export class NoteProductComponent implements OnInit {

  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() form:"cart"|"buy" = "cart"
  @Input() product: Partial<ProductInCartRequest> = {}
  isCart:boolean = true
  

  cartService = inject(CartService)
  mainService = inject(MainService)
  translate = inject(TranslateService)
  router = inject(Router)
  ngOnInit(): void {
    
  }

  open(){
    console.log(this.form)
    this.isCart = (this.form=='cart')
  }

  cancel() {
    this.visibleChange.emit(false)
  }

  submit() {
    console.log(this.isCart)
    if (this.isCart==true)
      this.addToCard()
    else
      this.buyNow()
    this.visibleChange.emit(false)
  }

  changeQuantity(quantity: number) {
    this.product.quantity = quantity
  }

  addToCard() {
    this.cartService.addToCart({
      productId: this.product.productId,
      productVariantId: this.product.productVariantId,
      quantity: this.product.quantity,
      note: this.product.note
    } as CartRequest).then(() => {
      this.mainService.createNotification("success", this.translate.instant("NOTIFICATION.SUCCESS.ADD_TO_CART"))
    }).catch((e) => {
      console.error(e.message)
      this.mainService.createNotification("error", this.translate.instant('NOTIFICATION.ERROR.CALL_API'))
    })
  }

  buyNow(){
    // console.log(`checkout?id=${product_c.id}&quantity=${product_c.quantity}&note=${product_c.note}`);
    this.router.navigate([`checkout`], { queryParams: { ...this.product } })
  }
}
