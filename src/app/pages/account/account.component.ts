import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MainService } from 'src/services/main.service';
import { Router } from '@angular/router';
import { CrudService } from 'src/services/crud.service';
import { LayoutService } from 'src/app/services/layout.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    standalone: false
})
export class AccountComponent implements OnInit {

  isMannageAddress = false
  user: Partial<User> = {}
  address: any = []

  address_user_choosing:any = null

  changing_fullname = false

  private layoutService = inject(LayoutService)
  private userService = inject(UserService)

  constructor(private location:Location, private main:MainService, private router:Router, private crud:CrudService){

  }

  back(){
    this.location.back();
  }
  async ngOnInit(){
    this.getUser()
  }

  async getUser():Promise<any>{

    (await this.userService.getProfile()).subscribe((user:User|null)=>{

      if(user){
        this.user = user
      }
    },()=>{},
    ()=>{this.layoutService.setReady()})


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

  submitChangeFullName(){
    this.changing_fullname = false
  }

  changePassword(){
    // console.log(this.user.token);
    // this.router.navigate(['account/new-password'],{queryParams:{'token':this.user.token}})
  }

}


