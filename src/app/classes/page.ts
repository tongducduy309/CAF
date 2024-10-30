import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable()
export class Page {
  @Output() ItemsCartAddEmitter= new EventEmitter()
  @Output() LoadingEmitter= new EventEmitter()
  @Output() changeQuantityEmitter= new EventEmitter()
  @Output() UserEmitter= new EventEmitter()
  must_load = 0
  constructor (){
    this.LoadingEmitter.emit(true)
    document.body.style.overflow = 'hidden'
  }


  addToCart(product:any){
    this.ItemsCartAddEmitter.emit(product);
  }




  loaded(){
    this.must_load--;
    if (this.must_load<=0){
      this.LoadingEmitter.emit(false)
      console.log(this.must_load);
      document.body.style.overflow = 'auto'
    }


  }

  reload(){
    window.location.reload()
  }
}
