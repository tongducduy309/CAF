import { Component, Input } from '@angular/core';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  standalone:false
})
export class ImageComponent {
  @Input() src = ""
  @Input() loading = true
  @Input() alt = ""
  @Input() custom = {}

  load(){
    this.loading = false
  }

  onImgError(event: Event) {
  (event.target as HTMLImageElement).src = '../../assets/images/example_product.png';
}
}
