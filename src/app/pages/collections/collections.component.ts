import { Component } from '@angular/core';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent {
  collections = [
    {
      id: '1',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/collections/1.png?v=1672641441',
      name: 'All Products', 
    },
    {
      id: '2',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/collections/tools.png?v=1672641367',
      name: 'Brewing Tools',
    },
    {
      id: '3',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/collections/Capsulated_Coffee.png?v=1672641571',
      name: 'Capsulated Coffee',
    },
  ]
}
