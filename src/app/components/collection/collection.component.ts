import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
  @Input() collection = {
    id: '1',
    img: 'https://coffee-workdo.myshopify.com/cdn/shop/collections/1.png?v=1672641441',
    name: 'All Products',
  }
  constructor(public route:Router){
    
  }
}
