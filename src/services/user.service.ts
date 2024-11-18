import { Injectable } from '@angular/core';
import { CrudService } from 'src/services/crud.service';
import { MainService } from './main.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isVerify=false;
  user: any = null
  constructor(private crud:CrudService, private main:MainService, private router:Router) { }




  async login_method_1(token:any):Promise<any>{


    return new Promise(async (resolve, reject) => {

      const result = await this.getUser(null,null,token)
      // console.log(result);
      if (result){
        if (result.result=='Success'){
          this.main.setCookie("u-caf",token,30)
          this.main.createNotification("success","Đăng nhập thành công")
          resolve({id:result.id,fullname:result.fullname,token:token})
        }
        if (result.result=='Not Verified')
          this.main.createNotification("info","Tài khoản chưa được xác thực")
        if (result.result=='Not Exist'){
          this.main.createNotification("info","Tài khoản không tồn tại")



        }
      }


    });
  }

  async login_method_2(email:any,password:any):Promise<any>{
    return new Promise(async (resolve, reject) => {
      const result = await this.getUser(email,password)
      if (result){
        if (result.result=='Success'){
          this.main.setCookie("u-caf",result.token,30)
          this.main.createNotification("success","Đăng nhập thành công")
          resolve({id:result.id,fullname:result.fullname,token:result.token})
        }
        if (result.result=='Not Verified')
          this.main.createNotification("info","Tài khoản chưa được xác thực")
        if (result.result=='Wrong Password')
          this.main.createNotification("info","Mật khẩu chưa chính xác")
        if (result.result=='Not Exist'){
          this.main.createNotification("info","Tài khoản không tồn tại")



        }
      }
      resolve(null)

    });


  }

  getUser(email:any=null,password:any=null,token:any=null):Promise<any>{
    // console.log(email,password,token);
      return new Promise((resolve, reject) => {
        if (email&&password){
          this.crud.get('users',`${email}/${password}`).subscribe((result:any)=>{
            resolve(result)

          })
        }
        else{
          if (token){
            this.crud.get('users',token).subscribe((user:any)=>{
              // console.log(user);
              resolve(user)
            })
          }
          // else resolve(null)
        }

      });
  }

  logout(){
    this.main.deleteCookie("u-caf")
    this.user = null
    this.main.createNotification("info","Đã đăng xuất tài khoản")
    this.router.navigate([''])
  }
}
