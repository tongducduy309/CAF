import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss'],
    standalone: false
})
export class CollectionComponent implements OnInit {
  @Input() collection = {
    id: '1',
    img: 'https://coffee-workdo.myshopify.com/cdn/shop/collections/1.png?v=1672641441',
    name: 'All Products',
    itemsCount: 42
  }
  constructor(public route:Router){
    
  }
  ngOnInit(): void {
    console.log(this.collection)
  }

  navigateToCollection() {
    this.route.navigate(['collections', this.collection.id]);
  }
}
