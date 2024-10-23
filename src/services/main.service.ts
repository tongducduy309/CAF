import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  getPrice(item:any){
    if (!item.sale) item.sale=0
    return (item.cost-item.cost*(item.sale/100))
  }
}
