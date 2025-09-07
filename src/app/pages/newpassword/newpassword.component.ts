import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/classes/page';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
    selector: 'app-newpassword',
    templateUrl: './newpassword.component.html',
    styleUrls: ['./newpassword.component.scss'],
    standalone: false
})
export class NewpasswordComponent extends Page implements OnInit,AfterViewInit{

  user:any = {}
  passwordVisible = false;
  isFormLogin = true;

  isValidEmail_RPW = true

  resetYP_email = ''

  token:any = ''

  processing=false

  constructor(private router:Router, private routed:ActivatedRoute, private main:MainService, private crud:CrudService){
    super()
  }
  ngAfterViewInit(): void {
    Promise.resolve().then(()=> {
      this.loaded()
    })
  }

  ngOnInit(): void {
    this.routed.queryParamMap.subscribe((params: any) => {
      this.token = params.get('token');
      this.user.email = params.get('email');
      console.log(this.user.email,this.token);
    });
  }

  isValidPassword(s:string){
    if (s.trim().length<8) return false
    return true
  }

  submit(){
    if (!this.isValidPassword(this.user.password)) {
      this.main.createNotification('error', 'Mật khẩu phải dài hơn 8 kí tự');
      return;
    }

    if (this.user.password!=this.user.confirm_password) {
      this.main.createNotification('error', 'Xác nhận mật khẩu phải trùng khớp với mật khẩu đã điền');
      return;
    }


    this.processing=true
    this.crud.put("users/password",{token:this.token,password:this.user.password, email:this.user.email}).then(res=>res.json()).then(data=>{
      if (data.result=='success'){

        const user = this.main.getCookie("u-caf")
        if (user&&user.token==this.token){
            this.main.createNotification("success","Thay đổi mật khẩu thành công")
            this.main.setCookie("u-caf",JSON.stringify({token:data.data,uid:user.uid,email:user.email,fullname:user.fullname}),43200)
            this.router.navigate([''])

        }
        else{
          this.main.createNotification("success","Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại")
          this.router.navigate(['account/login'])
        }

      }
      else{
        this.main.createNotification("info","Đặt lại mật khẩu không thành công")
      }
      this.processing=true
    })
  }
}
