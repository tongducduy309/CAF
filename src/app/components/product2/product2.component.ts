import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product2',
  templateUrl: './product2.component.html',
  styleUrls: ['./product2.component.scss']
})
export class Product2Component {
  selectedProvince = 'Black';
  provinceData = ['Black', 'White'];
  isFavorite = false;
}
