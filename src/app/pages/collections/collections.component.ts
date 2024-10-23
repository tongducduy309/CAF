import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/classes/page';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent extends Page implements OnInit {

  collections = [
    {
      id: '1',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/collections/1.png?v=1672641441',
      name: 'All Products',
      itemsCount: 42,
    },
    {
      id: '2',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/collections/tools.png?v=1672641367',
      name: 'Brewing Tools',
      itemsCount: 5,
    },
    {
      id: '3',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/collections/Capsulated_Coffee.png?v=1672641571',
      name: 'Capsulated Coffee',
      itemsCount: 8,
    },
    {
      id: '4',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/collections/Coffee_Accessories.png?v=1672641517',
      name: 'Coffee Accessories',
      itemsCount: 8,
    },
    {
      id: '5',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/collections/coffee_machines.png?v=1672641519',
      name: 'Coffee Machines',
      itemsCount: 7,
    },
    {
      id: '6',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/collections/Cups_Mugs.png?v=1672641521',
      name: 'Cups & Mugs',
      itemsCount:8,
    },
    {
      id: '7',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/collections/roast_Grinders.png?v=1672641551',
      name: 'Roast & Grinders',
      itemsCount: 7,
    },
    {
      id: '8',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/collections/Decaffeinated_Coffe.png?v=1672661990',
      name: 'Shop Product',
      itemsCount: 6,
    },
  ]

  ngOnInit(): void {
    this.loaded()
  }
}
