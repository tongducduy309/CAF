import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CrudService } from 'src/services/crud.service';
import emailjs from '@emailjs/browser';
import { Page } from 'src/app/classes/page';
import { UserService } from 'src/services/user.service';
import { MainService } from 'src/services/main.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Page implements OnInit,AfterViewInit {
  user_email = ''
  user_password = ''
  passwordVisible = false;
  message = ''
  isFormLogin = true;
  isSendEmailSuccess = false;

  resetYP_email = ''

  constructor (private crud:CrudService, public router:Router, private routed: ActivatedRoute, private userS:UserService, private main:MainService){
    super()
    // this.must_load=1
  }
  ngAfterViewInit(): void {
    Promise.resolve().then(()=> {
      // this.getUser()
      this.loaded()
    })

  }

  ngOnInit(): void {



    this.routed.paramMap.subscribe(params=>{
      this.isFormLogin=(params.get('param')==null);
      // this.loaded()
    })
  }

  // async getUser(){
  //   let token_cookie = this.main.getCookie("u-caf")
  //   console.log(token_cookie);
  //   if(token_cookie!=null){

  //     const user=await this.userS.login_method_1(token_cookie)
  //     if (user){
  //       this.UserEmitter.emit(user)
  //       // console.log("Login",user);
  //       this.router.navigate(['/'])
  //       // this.loaded()
  //     }
  //   }
  //   else{
  //     this.loaded()
  //   }
  // }

  formatEncode(n:any,a:any){
    let code=['A','B','C','D','E','F','G','H','I','J'];
    let s=n+"";
    while (s.length<a) s='0'+s;
    let x='';
    for (let i=0;i<a;i++) x+=code[parseInt(s[i])];


    return x;
}
  createID(){
    let date = new Date();
    let d=[date.getDate(),date.getMonth(),(date.getFullYear()+"").slice(2,4),date.getHours(),date.getMinutes(),date.getSeconds(),date.getMilliseconds()];
    let n=[2,2,2,2,2,2,4];
    let id='';
    for (let i=0;i<d.length;i++) id+=d[i];
    return id;
  }

  async submit(){
    if (this.user_email.trim().length==0||this.user_password.trim().length==0){
      this.main.createNotification("info","Vui lòng điền đầy đủ thông tin")
      return;
    }
    const user = await this.userS.login_method_2(this.user_email,this.user_password)
    if (user){
      this.UserEmitter.emit(user)
      this.router.navigate([''])
    }

  }

  onEnter() {
    this.submit()
  }



  register(){
    //this.sendEmail('recipient@example.com', 'Test Email', 'This is a test email sent from TypeScript.');
    this.router.navigate(['account/register'])
  }

  submit_resetPW(){
    let valid=this.isValidEmail(this.resetYP_email)
    if (valid){
      this.crud.get("reset-your-password",this.resetYP_email).subscribe((r:any)=>{
        if (r.result=='success'){
          this.isSendEmailSuccess=true
        }
        if (r.result=='Not Exist'){
          this.main.createNotification("info","Tài khoản không tồn tại")
        }
        if (r.result=='failed'){
          this.main.createNotification("info","Quá trình xác thực bị lỗi [403]")
        }
      })

    }else
    {
      this.main.createNotification('error', 'Email không hợp lệ, email phải chưa "@" (Ví dụ: vidu@example.com)');
    }
  }

  isValidEmail(email:string){
    if (email.length==0) return false
    if (email.indexOf("@")==-1) return false
    return true
  }

  // focusEmail_RPW(){
  //   this.isMessage=true
  // }

// Example usage

}
