import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Page } from 'src/app/classes/page';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends Page implements OnInit,AfterViewInit {

  submited = false

  user:any = {
    fullname: '',
    email:'',
    password:'',
    confirm_password:''
  }

  passwordVisible=false

  processing=false

  constructor(private crud:CrudService,private notification: NzNotificationService, public router:Router, private routed: ActivatedRoute, private userS:UserService, private main:MainService) {

    super()
    // this.must_load = 1
    this.routed.queryParamMap.subscribe(params => {
      const token = params.get('token')
      this.must_load++
      console.log(token);
      if (token!=null){
        this.crud.verifyUser(token).then(response => response.json())
        .then(async data=> {
          if(data.result=='Success'){
            console.log("Xác thực thành công");
            this.user =  await this.userS.login_method_1(token)
            this.UserEmitter.emit(this.user)
            this.router.navigate([''])
            this.loaded()
          }
          else{
            if(data.result=='Verified'){
              this.user=await this.userS.login_method_1(token)

              this.UserEmitter.emit(this.user)
              this.router.navigate([''])
            }
          }
          // console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
      else{
        this.loaded()
      }

    });

  }
  ngAfterViewInit(): void {
    Promise.resolve().then(()=> {
      this.loaded()
    })
  }

  ngOnInit(): void {
  }

  isValidEmail(email:string){
    if (email.length==0) return false
    if (email.indexOf("@")==-1) return false
    return true
  }

  isValid(s:string){
    if (s.trim().length==0) return false
    return true
  }

  isValidPassword(s:string){
    if (s.trim().length<8) return false
    return true
  }

  createNotification(type: string, message: string): void {
    this.notification.create(
      type,
      'Thông báo',
      message
    );
  }



  SendMess_Register(){
    if (this.user.fullname.trim().length==0||this.user.email.trim().length==0||this.user.password.trim().length==0){
      this.main.createNotification("info","Vui lòng điền đầy đủ thông tin")
      return;
    }

    if (!this.isValid(this.user.fullname)) {
      this.createNotification('info', 'Bắt buộc ghi đầy đủ họ và tên');
      return;
    }

    if (!this.isValidEmail(this.user.email)) {
      this.createNotification('info', 'Email không hợp lệ, email phải chưa "@" (Ví dụ: vidu@example.com)');
      return;
    }

    if (!this.isValidPassword(this.user.password)) {
      this.createNotification('info', 'Mật khẩu phải dài hơn 8 kí tự');
      return;
    }

    if (this.user.password!=this.user.confirm_password) {
      this.createNotification('info', 'Xác nhận mật khẩu phải trùng khớp với mật khẩu đã điền');
      return;
    }
    this.processing=true
    this.crud.addData("register",{
      email:this.user.email,
      fullname:this.user.fullname,
      password:this.user.password
    }).then(res=>res.json()).then(data=>{
      if (data.result=='success'){
        this.submited = true
      }
      else{
        if(data.result=='existed'){
          this.main.createNotification("info","Email đã tồn tại")
        }
        else{
          this.main.createNotification("error","Xảy ra lỗi")
        }
      }
      this.processing=false
    })


    // this.crud.addNewData('users',this.Email_Fill,{
    //   firstName: this.FirstName_Fill,
    //   lastName: this.LastName_Fill,
    //   password:this.Password_Fill,
    //   email: this.Email_Fill
    // })



    // this.createNotification('success', 'Thanks for registering!');


    // this.fullname = '';
    // this.Email_Fill = '';
    // this.Password_Fill = '';
  }
}
