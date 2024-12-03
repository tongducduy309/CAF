import { Component, Input } from '@angular/core';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent {

  @Input() bill:any = {}

  constructor(public main:MainService){

  }
}
