import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() data = {
    img:'https://tulieuvankien.dangcongsan.vn/Uploads/2018/7/5/4/united_kingdom.jpg',
    name:'Tên Sản Phẩm',
    price:'10.000'
  }
  @Output() out = new EventEmitter()

  push(){
    this.out.emit(this.data.name)
  }
}
