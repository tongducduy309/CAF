import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';
import { UserService } from 'src/services/user.service';

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

  constructor (private crud:CrudService, private main:MainService, private userS:UserService){

    // this.getItemsCart()
  }



  change(componentRef:any){
    componentRef.ItemsCartAddEmitter?.subscribe((res:any)=>{
      if (this.user){
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
      }else{
        this.main.createNotification("info","Đăng nhập để thêm sản phẩm vào giỏ hàng")
      }

      // this.putItemCartToSession(this.itemsCart)
      console.log(res);
    })
    componentRef.LoadingEmitter?.subscribe((res:any)=>{
      // console.log(this.loading);
      this.loading=res

    })
    componentRef.UserEmitter?.subscribe((res:any)=>{
      // console.log(res);
      this.user = res

    })

  }

  async getUser():Promise<any>{

    return new Promise(async (resolve, reject) => {
      const token = this.main.getCookie("u-caf")

      if(token){
        const result = await this.userS.getUser(null,null,token)
        if (result){
          if (result.result=='Success'){
            resolve({id:result.id})
          }
        }
        resolve(null)


      }


    });


  }





  // getItemsCart(){
  //   // this.itemsCart = this.getItemsCartFromLocalStorage()

  //   this.total = 0
  //   this.subtotal=0

  //   for (let ite of this.itemsCart){
  //     this.total+=ite.quantity*1
  //     this.subtotal+=ite.quantity*this.main.getPrice(ite)
  //   }
  // }

  // getItemsCartFromLocalStorage(){
  //   return JSON.parse(window.localStorage.getItem("caf-itemsCart") || '[]')
  // }


  // putItemCartToSession(items:any){
  //   // console.log(items);
  //   window.localStorage.setItem(`caf-itemsCart`,JSON.stringify(items))
  // }

}
