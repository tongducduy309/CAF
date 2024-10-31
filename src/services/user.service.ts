import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user';
import { CrudService } from 'src/services/crud.service';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isVerify=false;
  user: any = null
  constructor(private crud:CrudService, private main:MainService,) { }




  login_method_1(token:any):Promise<any>{

    return new Promise((resolve, reject) => {
      this.crud.get('users',token).subscribe((user:any)=>{
        if (user){
          this.setUser(user.id,user.fullname,token,user.verify)
          console.log(this.user);
          resolve(this.user);
        }
        else{
          this.main.createNotification("info","Tài khoản không tồn tại")
          resolve(null)
        }
      })

    });
  }

  setUser(id:any,name:any,token:any,verify:any){
    if(verify){
      this.user = new User(id,name,token)
      this.main.setCookie("u-caf",token)
      this.main.createNotification("success","Đăng nhập thành công")
    }
    else{
      this.main.createNotification("warning","Tài khoản chưa được xác thực")
    }
  }

  login_method_2(email:any,password:any):Promise<any>{
    return new Promise((resolve, reject) => {
      this.crud.get('users',`${email}/${password}`).subscribe((result:any)=>{
        if (result.result=='Not Verified')
          this.main.createNotification("info","Tài khoản chưa được xác thực")
        if (result.result=='Success'){
          this.setUser(result.id,result.fullname,result.token,result.verify)
          resolve(this.user);
        }
        if (result.result=='Not Exist'){
          this.main.createNotification("info","Tài khoản không tồn tại")
          resolve (null)

        }

      })

    });

  }

  logout(){
    this.main.deleteCookie("u-caf")
    this.user = null
    this.main.createNotification("info","Đã đăng xuất tài khoản")
  }
}
