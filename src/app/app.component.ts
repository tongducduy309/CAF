import { Component } from '@angular/core';
import { CrudService } from 'src/services/crud.service';
import { Page } from './classes/page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Page{
  title = 'Coffee Store';
  passwordVisible = false;
  user_password?: string;
  itemsCart:any = []
  total = 0
  subtotal = 0

  constructor (private crud:CrudService){
    super()
  }

  change(componentRef:any){
    componentRef.ItemsCartEmitter?.subscribe((res:any)=>{
      this.total+=res.quantity
      this.subtotal+=res.quantity*this.getPrice(res)
      let n = -1
      for (let i = 0; i<this.itemsCart.length;i++){
        if (this.itemsCart[i].id==res.id){
          n=i;
          break;
        }
      }
      if (n==-1){
        this.itemsCart = [...this.itemsCart,res]
      }
      else{
        this.itemsCart[n].quantity+=res.quantity
      }
      console.log(res);
    })
  }

  changeQuantityItem(item:any){
    console.log(item);
    if (item.quantity==0){


      this.itemsCart = this.itemsCart.filter((ite:any)=>!(ite.pid==item.pid))
    }
    this.total = 0
    this.subtotal=0

    for (let item of this.itemsCart){
      this.total+=item.quantity
      this.subtotal+=item.quantity*this.getPrice(item)
    }

  }

}
