import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/classes/page';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent extends Page implements OnInit {

  user:any = {}

  bill:any = {}

  products: any = []

  constructor (){
    super()
  }
  ngOnInit(): void {
    this.products = this.getItemsCartFromLocalStorage()
    this.loaded()
  }

  getItemsCartFromLocalStorage(){
    return JSON.parse(window.localStorage.getItem("caf-itemsCart") || '[]')
  }

}
