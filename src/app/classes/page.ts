import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable()
export class Page {
  @Output() ItemsCartEmitter= new EventEmitter()

  constructor (){

  }

  changeItemsCart(event:any){
    this.ItemsCartEmitter.emit(event);
  }
}
