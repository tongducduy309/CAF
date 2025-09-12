import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-rating-product',
    templateUrl: './rating-product.component.html',
    styleUrls: ['./rating-product.component.scss'],
    standalone: false
})
export class RatingProductComponent {
  @Input() review:any = {}

  FILE_URL = environment.variable_global.FILE_URL;

  onImgError(event: Event) {
  (event.target as HTMLImageElement).src = '../../assets/images/example_product.png';
}
}
