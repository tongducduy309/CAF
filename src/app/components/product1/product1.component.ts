import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-product1',
    templateUrl: './product1.component.html',
    styleUrls: ['./product1.component.scss'],
    standalone: false
})
export class Product1Component {
  @Input() product:any = {}
  @Output() closeEmitter = new EventEmitter();
  FILE_URL = environment.variable_global.FILE_URL;

  constructor(private router:Router) { }

  onClick(){
    this.closeEmitter.emit();
    this.router.navigate(['products/'+this.product.nameId]);
    
  }

  onImgError(event: Event) {
  (event.target as HTMLImageElement).src = '../../assets/images/example_product.png';
}
}
