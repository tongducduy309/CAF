import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product1',
  templateUrl: './product1.component.html',
  styleUrls: ['./product1.component.scss']
})
export class Product1Component {
  @Input() product = {
    id:'1',
    img:'https://coffee-workdo.myshopify.com/cdn/shop/products/1_f9e82651-1554-4bdc-a3bd-a8f8d1c454eb_600x600.png?v=1672658975',
    name:'Tên sản phẩm',
    price:'0',
    cost:'1',
  }
  constructor(public route:Router){

  }
}
