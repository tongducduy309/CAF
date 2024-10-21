import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product3',
  templateUrl: './product3.component.html',
  styleUrls: ['./product3.component.scss']
})
export class Product3Component implements OnInit {
  @Input() product:any = {
  }

  @Input() bg = '#6a593d21';
  @Input() color_text = '#262626';

  @Output() addToCartEmitter = new EventEmitter();

  selectedSize = 0;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  isFavorite = false;

  AddToCart(){
    console.log("Add To Cart");
    this.addToCartEmitter.emit(this.product);
  }

  detailProduct(){
    this.router.navigate([+"#head"])
  }
}
