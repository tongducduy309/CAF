
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductInCartRequest } from 'src/app/dto/request/cart.request';
import { Product, ProductVariant } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { MainService } from 'src/services/main.service';

@Component({
    selector: 'app-product3',
    templateUrl: './product3.component.html',
    styleUrls: ['./product3.component.scss'],
    standalone: false
})
export class Product3Component implements OnInit {
  @Input() product:Partial<Product> = {
  }
  productInCart:Partial<ProductInCartRequest> = {}

  @Input() bg = '#6a593d21';
  @Input() color_text = '#262626';

  selectedSize:Partial<ProductVariant> = {};

  isFormAddToCart = false;

  FILE_URL = environment.variable_global.FILE_URL;

  constructor(public main:MainService) { }

  ngOnInit(): void {
    this.selectedSize = this.product.variants?this.product.variants[0]:{
    id: '',
    size: '',
    price: 0,
    status: false
  };
    console.log(this.product);
  }


  openFormAddToCart(){
    this.productInCart = {
      name:this.product.name,
      size:this.selectedSize.size,
      productId:this.product.id,
      productVariantId:this.selectedSize.id,
      quantity:1
    } as ProductInCartRequest
    this.isFormAddToCart = true
  }

  

}
