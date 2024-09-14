import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CrudService } from 'src/services/crud.service';
import emailjs from '@emailjs/browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user_email = ''
  user_password = ''
  passwordVisible = false;
  message = ''
  isFormLogin = true;

  resetYP_email = ''

  constructor (private crud:CrudService,private notification: NzNotificationService, public route:Router, private routed: ActivatedRoute){
    console.log(window.location.origin);
  }

  ngOnInit(): void {
    this.routed.paramMap.subscribe(params=>{
      this.isFormLogin=(params.get('param')==null);
    })
  }

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
    let id='#';
    for (let i=0;i<d.length;i++) id+=this.formatEncode(d[i],n[i]);
    return id;
  }

  submit(){
    this.crud.getUsers().subscribe((data)=>{
      let isLogin = false;
      data.forEach(user => {
        if (user.id==this.user_email && user.password==this.user_password){
          this.createNotification('success','Đăng Nhập Thành Công');
          isLogin = true
        }
      });
      if (!isLogin){
        this.createNotification('error','Đăng Nhập Thất Bại');
      }
    })
  }

  createNotification(type: string, message: string): void {
    this.notification.create(
      type,
      'Notification',
      message
    );
  }

  register(){
    //this.sendEmail('recipient@example.com', 'Test Email', 'This is a test email sent from TypeScript.');
    this.route.navigate(['accounts/register'])
  }

  submit_resetPW(){
    let valid=this.isValidEmail(this.resetYP_email)
    if (valid){
      const token = this.createID();
      const url = `${window.location.origin}/accounts/newpassword?token=${token}` ;
      this.sendEmail(this.resetYP_email,url);
    }else
    {
      this.createNotification("error","Please Enter '@' In The Email Address")
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


  async sendEmail(to_email:string,url:string) {
    emailjs.init("CtwqRDLtwyzaFMbck")
    let res = await emailjs.send("service_1t6ee1w","template_qf0hube",{
      to_email:to_email,
      url:url


    });
    console.log(res);
    if (res.status==200){
      this.isFormLogin=true;
      this.createNotification('success',"We've sent you an email with a link to update your password.")
    }else{
      this.createNotification('error',"Error: Status="+res.status)
    }

  }

// Example usage

}
