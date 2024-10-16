import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product3',
  templateUrl: './product3.component.html',
  styleUrls: ['./product3.component.scss']
})
export class Product3Component implements OnInit {
  @Input() product:any = {

  }

  @Output() addToCartEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  selectedProvince = 'Red';
  provinceData = ['Red', 'Black'];
  isFavorite = false;

  AddToCart(){
    console.log("Add To Cart");
    this.addToCartEmitter.emit(this.product);
  }
}
