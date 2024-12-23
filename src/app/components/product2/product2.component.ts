import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-product2',
  templateUrl: './product2.component.html',
  styleUrls: ['./product2.component.scss']
})
export class Product2Component implements OnInit{
  ngOnInit(): void {
  }
  @Input() product:any = {}

  @Output() addToCartEmitter = new EventEmitter();
  @Input() bg = '#a7897b61';
  selectedProvince = 'Black';
  provinceData = ['Black', 'White'];
  isFavorite = false;
  selectedSize = 0
  isFormAddToCart = false

  constructor (public main:MainService){

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
