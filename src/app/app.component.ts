import { Component } from '@angular/core';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Coffee Store';
  passwordVisible = false;
  user_password?: string;
  itemsCart:any = []
  total = 0
  subtotal = 0
  loading:any = true
  header_footer_visible = true
  user:any=null;

  constructor (private crud:CrudService, private main:MainService){

    this.getItemsCart()
  }

  change(componentRef:any){
    componentRef.ItemsCartAddEmitter?.subscribe((res:any)=>{
      this.total+=res.quantity*1
      this.subtotal+=res.quantity*this.main.getPrice(res)
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

      this.putItemCartToSession(this.itemsCart)
      console.log(res);
    })

    componentRef.changeQuantityEmitter?.subscribe((res:any)=>{
      this.changeQuantityItem(res);
      // console.log("App",res);
    })
    componentRef.LoadingEmitter?.subscribe((res:any)=>{
      console.log(this.loading);
      this.loading=res

    })
    componentRef.UserEmitter?.subscribe((res:any)=>{
      // console.log(res);
      this.user = res

    })

  }



  changeQuantityItem(item:any){
    this.total = 0
    this.subtotal=0

    for (let ite of this.itemsCart){
      if (item.id==ite.id){
        ite.quantity = item.quantity
      }
      this.total+=ite.quantity*1
      this.subtotal+=ite.quantity*this.main.getPrice(ite)
    }
    if (item.quantity==0){
      this.itemsCart = this.itemsCart.filter((ite:any)=>!(ite.pid==item.pid))
    }

    console.log(this.subtotal,this.total);

    this.putItemCartToSession(this.itemsCart)

  }

  getItemsCart(){
    this.itemsCart = this.getItemsCartFromLocalStorage()

    this.total = 0
    this.subtotal=0

    for (let ite of this.itemsCart){
      this.total+=ite.quantity*1
      this.subtotal+=ite.quantity*this.main.getPrice(ite)
    }
  }

  getItemsCartFromLocalStorage(){
    return JSON.parse(window.localStorage.getItem("caf-itemsCart") || '[]')
  }


  putItemCartToSession(items:any){
    // console.log(items);
    window.localStorage.setItem(`caf-itemsCart`,JSON.stringify(items))
  }

}
