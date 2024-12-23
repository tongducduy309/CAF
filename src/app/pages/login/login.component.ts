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

  processing = false

  constructor (private crud:CrudService, public router:Router, private routed: ActivatedRoute, private userS:UserService, private main:MainService){
    super()
    // this.must_load=1
  }

  user=null
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

  async submit(){
    if (this.user_email.trim().length==0||this.user_password.trim().length==0){
      this.main.createNotification("info","Vui lòng điền đầy đủ thông tin")
      return;
    }

    if (!this.isValidEmail(this.user_email)) {
      this.main.createNotification('info', 'Email không hợp lệ, email phải chưa "@" (Ví dụ: vidu@example.com)');
      return;
    }
    this.processing=true
    this.user = await this.userS.login_method_2(this.user_email,this.user_password)
    if (this.user){
      this.UserEmitter.emit(this.user)
      this.router.navigate([''])
    }
    this.processing=false

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
        else this.main.createNotification("info","Tài khoản không tồn tại")
        // if (r.result=='failed'){
        //   this.main.createNotification("info","Quá trình xác thực bị lỗi [403]")
        // }
      })

    }else
    {
      this.main.createNotification('info', 'Email không hợp lệ, email phải chưa "@" (Ví dụ: vidu@example.com)');
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
