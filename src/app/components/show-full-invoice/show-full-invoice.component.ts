import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MainService } from 'src/services/main.service';

@Component({
    selector: 'app-show-full-invoice',
    templateUrl: './show-full-invoice.component.html',
    styleUrls: ['./show-full-invoice.component.scss'],
    standalone: false
})
export class ShowFullInvoiceComponent implements OnChanges{
  @Input() bill:any = {}
  total = 0
  constructor (public main:MainService){

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bill']){
      switch (this.bill.status){
        case 1:
          this.bill.status_text = 'Đang pha chế'
          this.bill.status_color = 'orange'
          break;
        case 2:
          this.bill.status_text = 'Đang giao hàng'
          this.bill.status_color = 'purple'
          break;
        case 3:
          this.bill.status_text = 'Đã nhận'
          this.bill.status_color = 'green'
          break;
        case 4:
          this.bill.status_text = 'Hủy'
          this.bill.status_color = 'red'
          break;
        default:
          this.bill.status_text = 'Chờ xác nhận'
          this.bill.status_color = 'blue'
      }

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
