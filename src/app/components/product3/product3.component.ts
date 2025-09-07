import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/services/main.service';

@Component({
    selector: 'app-product3',
    templateUrl: './product3.component.html',
    styleUrls: ['./product3.component.scss'],
    standalone: false
})
export class Product3Component implements OnInit {
  @Input() product:any = {
  }

  @Input() bg = '#6a593d21';
  @Input() color_text = '#262626';

  @Output() addToCartEmitter = new EventEmitter();

  selectedSize = 0;

  isFormAddToCart = false

  constructor(public main:MainService) { }

  ngOnInit(): void {
  }

  AddToCart(product:any){
    const product_c = {
      id:this.product.id[this.selectedSize],
      pid:this.product.id,
      name:this.product.name,
      quantity:product.quantity,
      sale:this.product.sale[this.selectedSize],
      cost:this.product.cost[this.selectedSize],
      size:this.product.size[this.selectedSize],
      name_id: this.product.name_id,
      note:product.note
    }
    this.addToCartEmitter.emit(product_c);
  }

  openFormAddToCart(){
    this.product["quantity"] = 1
    this.product["note"]=''
    this.product["sizeSelected"] = this.product.size[this.selectedSize]
    this.isFormAddToCart = true
  }

}
