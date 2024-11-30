import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-product',
  templateUrl: './rating-product.component.html',
  styleUrls: ['./rating-product.component.scss']
})
export class RatingProductComponent {
  @Input() review:any = {}
}
