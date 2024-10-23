import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Page } from 'src/app/classes/page';
import { MainService } from 'src/services/main.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends Page implements AfterViewInit{
  @Input() itemsCart:any = []
  subtotal = 0
  constructor(private location:Location, private main:MainService){
    super()
    this.must_load = 1
  }
  ngAfterViewInit(): void {
    Promise.resolve().then(()=> this.getItemsCart())
  }
  ngOnInit(): void {

  }
  back(){
    this.location.back();
  }

  getItemsCart(){
    this.itemsCart = this.getItemsCartFromLocalStorage()
    for (let item of this.itemsCart){
      this.subtotal+=item.quantity*this.main.getPrice(item)
    }
    console.log(this.itemsCart);
    this.loaded()
  }

  getItemsCartFromLocalStorage(){
    return JSON.parse(window.localStorage.getItem("caf-itemsCart") || '[]')
  }

  changeQuantityItem(item:any){
    // console.log("cart",item);
    let items = []
    if (item.quantity==0)
      this.itemsCart = this.itemsCart.filter((ite:any)=>!(ite.pid==item.pid))
    this.subtotal = 0
    for (let item of this.itemsCart){
      this.subtotal+=item.quantity*this.main.getPrice(item)
    }
    // else{
    //   for (let ite of this.itemsCart){
    //     if (ite.pid==item.pid){
    //       ite.quantity = item.quantity

    //     }
    //     items.push(ite)
    //   }
    // }
    // this.itemsCart

      //

    this.changeQuantityEmitter.emit(item)


  }
}
