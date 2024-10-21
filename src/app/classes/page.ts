import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable()
export class Page {
  @Output() ItemsCartEmitter= new EventEmitter()

  constructor (){

  }


  addToCart(product:any){
    this.ItemsCartEmitter.emit(product);
  }

  getPrice(item:any){
    if (!item.sale) item.sale=0
    console.log(item.cost,item.cost*(item.sale/100));
    return (item.cost-item.cost*(item.sale/100))
  }
}
