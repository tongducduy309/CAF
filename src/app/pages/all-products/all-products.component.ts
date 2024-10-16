import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/classes/page';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent extends Page implements OnInit  {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  expandIconPosition: 'start' | 'end' = 'start';
  panels = [
    {
      active: true,
      name: 'Availability',
    },
    {
      active: true,
      name: 'Price'
    },
    {
      active: true,
      name: 'Product type'
    }
  ];

}
