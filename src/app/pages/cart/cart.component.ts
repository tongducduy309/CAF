import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Page } from 'src/app/classes/page';
import { MainService } from 'src/services/main.service';
import { CrudService } from 'src/services/crud.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends Page{
  @Input() itemsCart:any = []
  subtotal = 0
  user:any={}
  constructor(private location:Location, public main:MainService, private crud:CrudService,private router:Router, private userS:UserService){
    super()
    this.must_load = 1
  }
  ngOnInit(): void {
    this.checkUser()
  }
  back(){
    this.location.back();
  }

  getItemsCart(){
    this.crud.get("cart",this.user.id).subscribe((response:any)=>{
      this.itemsCart = response.data
      this.cal_Info_Cart()
      // console.log(this.itemsCart);
      this.loaded()
    })

  }


  async checkUser(){
    this.user = await this.getUser();
    if (!this.user)
    {
      this.router.navigate([''])
    }
    else{
      this.getItemsCart()
    }

  }

  async getUser():Promise<any>{

    return new Promise(async (resolve, reject) => {
      const user = this.main.getCookie("u-caf")

      if(user){
        const result = await this.userS.getUser(null,null,user.token)
        if (result){
          if (result.result=='Success'){
            resolve({id:result.id,email:result.email})
          }
        }
        resolve(null)


      }


    });


  }

  changeQuantityItem(item:any){
    // console.log("cart",item);
    let items = []
    if (item.quantity==0)
      this.itemsCart = this.itemsCart.filter((ite:any)=>!(ite.pid==item.pid))
    this.subtotal = 0
    for (let item of this.itemsCart){
      this.subtotal+=item.quantity*this.main.getPrice(item)
    }
    // else{
    //   for (let ite of this.itemsCart){
    //     if (ite.pid==item.pid){
    //       ite.quantity = item.quantity

    //     }
    //     items.push(ite)
    //   }
    // }
    // this.itemsCart

      //

    this.changeQuantityEmitter.emit(item)


  }

  removeItemInCart(data:any){
    const id = data.id

    this.crud.delete("cart",id).subscribe((res:any)=>{
      console.log(res);
      if (res.result=='success'){
        console.log(this.itemsCart);
        this.itemsCart = this.itemsCart.filter((ite:any)=>ite.id!=id)
        this.cal_Info_Cart()

      }
      else{
        this.main.createNotification("error","Xóa sản phẩm khỏi giỏ hàng không thành công")
      }
    })
  }

  cal_Info_Cart(){
    this.subtotal=0

    for (let ite of this.itemsCart){
      this.subtotal+=ite.quantity*this.main.getPrice(ite)
    }

  }
}
