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

    if (!token) return null
    return new Promise(async (resolve, reject) => {

      const result = await this.getUser(null,null,token)

      // resolve(result)
      // return result
      // console.log(result);
      if (result){
        if (result.result=='Success'){
          this.main.setCookie("u-caf",JSON.stringify({token:token,uid:result.id,email:result.email,fullname:result.fullname}),43200)
          this.main.createNotification("success","Đăng nhập thành công")
          resolve({id:result.id,fullname:result.fullname,token:token})
        }
        resolve(null)
        if (result.result=='Not Verify')
        {
          this.main.createNotification("info","Tài khoản chưa được xác thực")
        }

        if (result.result=='Not Exist')
          this.main.createNotification("info","Tài khoản không tồn tại")




        if (result.result=='Blocked')
          this.main.createNotification("info","Tài khoản đang tạm khóa")
      }
      else{
        resolve(null)
      }


    });
  }

  async login_method_2(email:any,password:any):Promise<any>{
    if (!email || !password) return null
    return new Promise(async (resolve, reject) => {
      const result = await this.getUser(email,password)
      if (result){
        console.log(result);
        if (result.result=='Success'){
          this.main.setCookie("u-caf",JSON.stringify({token:result.token,uid:result.id,email:result.email,fullname:result.fullname}),43200)
          this.main.createNotification("success","Đăng nhập thành công")
          resolve({id:result.id,fullname:result.fullname,token:result.token})
        }
        resolve(null)
        if (result.result=='Not Verify')
          this.main.createNotification("info","Tài khoản chưa được xác thực")
        if (result.result=='Wrong Password')
          this.main.createNotification("info","Mật khẩu chưa chính xác")
        if (result.result=='Not Exist')
          this.main.createNotification("info","Tài khoản không tồn tại")
        if (result.result=='Blocked')
          this.main.createNotification("info","Tài khoản đang tạm khóa")



      }
      resolve(null)

    });


  }

  getUser(email:any=null,password:any=null,token:any=null):Promise<any>{
    // console.log(email,password,token);

      return new Promise((resolve, reject) => {
        // resolve(2)
        if (email&&password){
          this.crud.get('users',`${email}/${password}`).subscribe((result:any)=>{
            resolve(result)

          })
        }
        else{
          if (token){
            this.crud.get('users',token).subscribe((user:any)=>{
              resolve(user)
            })
          }
          else resolve(null)
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
