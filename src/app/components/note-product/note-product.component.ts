import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
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
  @Input() title = 'Thêm vào giỏ'
  @Input() product: Partial<ProductInCartRequest> = {}
  @Output() submitEmitter = new EventEmitter();
  cartService = inject(CartService)
  mainService = inject(MainService)
  translate = inject(TranslateService)
  ngOnInit(): void {
    console.log(this.product)
  }

  cancel() {
    this.visibleChange.emit(false)
  }

  submit() {
    this.addToCard()
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
}
