import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-item-shopping-cart',
  templateUrl: './item-shopping-cart.component.html',
  styleUrls: ['./item-shopping-cart.component.scss']
})
export class ItemShoppingCartComponent implements OnInit{

  @Input() item:any = {}
  @Output() QuantityEmitter = new EventEmitter()

  constructor(){

  }

  ngOnInit(): void {
  }

  remove(){
    this.item.quantity = 0
    this.QuantityEmitter.emit(this.item)
  }

  changeQuantity(){
    this.item.quantity = this.item.quantity.replace(/\D/g, '');
    if(this.item.quantity<1) this.item.quantity=1
    this.QuantityEmitter.emit(this.item)
  }

  removeQuantity(){
    if (this.item.quantity>1)
    {
      this.item.quantity--;
      this.QuantityEmitter.emit(this.item)
    }

  }

  addQuantity(){
    this.item.quantity++;
    this.QuantityEmitter.emit(this.item)

  }
}
