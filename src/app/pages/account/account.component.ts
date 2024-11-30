import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/classes/page';
import { Location } from '@angular/common';
import { MainService } from 'src/services/main.service';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends Page implements OnInit {

  isMannageAddress = false
  user: any = null
  address: any = []

  address_user_choosing:any = null

  constructor(private location:Location, private main:MainService, private userS:UserService, private router:Router, private crud:CrudService){
    super()
  }

  back(){
    this.location.back();
  }
  async ngOnInit(){
    this.user = await this.getUser()
    if (!this.user)
      this.router.navigate([''])
    this.loaded()
  }

  async getUser():Promise<any>{

    return new Promise(async (resolve, reject) => {
      const token = this.main.getCookie("u-caf")

      if(token){
        const result = await this.userS.getUser(null,null,token)
        if (result){
          if (result.result=='Success'){
            resolve({
              id:result.id,
              fullname:result.fullname,
              token:result.token,
              point:result.point,
              email:result.email,
              contactNumber: result.contactNumber,
              ranking:this.getRanking(result.point),
              id_address_default:result.id_address_default
            })
          }
        }
        resolve(null)


      }


    });


  }


  getRanking(point:any){
    if (point>0&&point<500){
      return 'Bạc'
    }
    if (point>=500&&point<2000){
      return 'Vàng'
    }
    if (point>2000&&point<5000){
      return 'Kim cương'
    }
    if (point>5000){
      return 'VIP'
    }
    return 'Thành viên mới'
  }

  // chooseAddress(a:any){
  //   this.address_user_choosing = a
  //   console.log(a);
  //   this.isMannageAddress=false
  // }

}


