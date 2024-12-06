import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnChanges{

  @Input() bill:any = {}
  total = 0

  constructor(public main:MainService){

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bill']){
      this.total=0
      for (let p of this.bill.products){
        this.total+=p.quantity*1
      }
    }
  }

  formatDateToString(s:any){
    if (s){
      const date = new Date(s);

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    }
    return null
  }
}
