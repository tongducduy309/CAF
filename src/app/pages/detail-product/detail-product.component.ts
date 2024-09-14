import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent {
  products=[
    {
      id:'1',
      img:'https://coffee-workdo.myshopify.com/cdn/shop/products/1_f9e82651-1554-4bdc-a3bd-a8f8d1c454eb_600x600.png?v=1672658975',
      name:'Tên sản phẩm 1',
      price:'20.000',
      cost:'40.000',
    },
    {
      id:'2',
      img:'https://coffee-workdo.myshopify.com/cdn/shop/products/1_f05ae8de-129a-4d3f-afba-d062e1ffb1d8_600x600.png?v=1672659207',
      name:'Tên sản phẩm 2',
      price:'10.000' ,
      cost:'0',
    },
    {
      id:'3',
      img:'https://coffee-workdo.myshopify.com/cdn/shop/products/1_f9e82651-1554-4bdc-a3bd-a8f8d1c454eb_600x600.png?v=1672658975',
      name:'Tên sản phẩm 3',
      price:'10.000' ,
      cost:'0',
    },
    {
      id:'4',
      img:'https://coffee-workdo.myshopify.com/cdn/shop/products/1_f9e82651-1554-4bdc-a3bd-a8f8d1c454eb_600x600.png?v=1672658975',
      name:'Tên sản phẩm 4',
      price:'10.000' ,
      cost:'0',
    }
  ]
}
