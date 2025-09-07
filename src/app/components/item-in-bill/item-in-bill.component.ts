import { Component, Input } from '@angular/core';
import { MainService } from 'src/services/main.service';

@Component({
    selector: 'app-item-in-bill',
    templateUrl: './item-in-bill.component.html',
    styleUrls: ['./item-in-bill.component.scss'],
    standalone: false
})
export class ItemInBillComponent {
  @Input() product:any = {}
  constructor(public main:MainService){

  }
}
