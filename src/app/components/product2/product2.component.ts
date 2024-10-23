import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product2',
  templateUrl: './product2.component.html',
  styleUrls: ['./product2.component.scss']
})
export class Product2Component implements OnInit{
  ngOnInit(): void {
    console.log(this.product);
  }
  @Input() product:any = {}
  @Input() bg = '#a7897b61';
  selectedProvince = 'Black';
  provinceData = ['Black', 'White'];
  isFavorite = false;
  selectedSize = 0


}
