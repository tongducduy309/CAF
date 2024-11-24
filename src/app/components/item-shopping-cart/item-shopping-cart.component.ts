import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-item-shopping-cart',
  templateUrl: './item-shopping-cart.component.html',
  styleUrls: ['./item-shopping-cart.component.scss']
})
export class ItemShoppingCartComponent implements OnInit{

  @Input() item:any = {}
  @Output() QuantityEmitter = new EventEmitter()
  @Output() RemoveEmitter = new EventEmitter()

  constructor(private router:Router, public main:MainService){

  }

  ngOnInit(): void {
    // console.log(this.item);
  }

  remote(s:any){
    console.log(s);
    this.router.navigate([s])
  }

  remove(){
    this.RemoveEmitter.emit({id:this.item.id,quantity:this.item.quantity})
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
