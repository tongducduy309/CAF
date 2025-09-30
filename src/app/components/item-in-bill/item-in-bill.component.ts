import { Component, Input } from '@angular/core';
import { CartResponse } from 'src/app/dto/response/cart.response';
import { environment } from 'src/environments/environment';
import { MainService } from 'src/services/main.service';

@Component({
    selector: 'app-item-in-bill',
    templateUrl: './item-in-bill.component.html',
    styleUrls: ['./item-in-bill.component.scss'],
    standalone: false
})
export class ItemInBillComponent {
  @Input() item:Partial<CartResponse> = {}
  FILE_URL = environment.variable_global.FILE_URL;
  constructor(public main:MainService){

  }
}
