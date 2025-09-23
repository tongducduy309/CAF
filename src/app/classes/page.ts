import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable()
export class Page {
  @Output() ItemsCartAddEmitter= new EventEmitter()
  @Output() LoadingEmitter= new EventEmitter()
  @Output() changeQuantityEmitter= new EventEmitter()
  @Output() UserEmitter= new EventEmitter()
  must_load=1
  constructor (){
    this.LoadingEmitter.emit(true)
  }


  addToCart(product:any){
    this.ItemsCartAddEmitter.emit(product);
  }




  loaded(){


  }

  reload(){
    window.location.reload()
  }
}
