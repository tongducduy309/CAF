import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-flash-sales',
  templateUrl: './flash-sales.component.html',
  styleUrls: ['./flash-sales.component.scss']
})
export class FlashSalesComponent implements OnInit{
  fs:any = []

  constructor(public main:MainService, private crud:CrudService) {}

  ngOnInit(): void {
    this.getFlashSales()
  }

  getFlashSales(){
    this.crud.get("flash-sales","all").subscribe((res:any)=>{
      this.fs = res.data
      console.log(res);
    })
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
