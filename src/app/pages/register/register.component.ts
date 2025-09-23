import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Page } from 'src/app/classes/page';
import { UserRequest } from 'src/app/dto/request/UserRequest';
import { UserService } from 'src/app/services/user.service';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: false
})
export class RegisterComponent implements OnInit{

  submited = false

  user:any = {
    fullname: '',
    email:'',
    password:'',
    confirm_password:''
  }

  passwordVisible=false

  loading=false

  constructor(private crud:CrudService,private notification: NzNotificationService, public router:Router, private routed: ActivatedRoute, 
    private main:MainService,
  private userService:UserService) {


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
    if (!this.user.fullname||!this.user.email||!this.user.password){
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
    this.loading=true
    this.userService.register({
      email:this.user.email,
      fullname:this.user.fullname,
      password:this.user.password,
    } as UserRequest).then(data=>{
      this.main.createNotification("success","Đăng ký thành công, vui lòng kiểm tra email để xác thực tài khoản")
      this.router.navigate(['account/login'])
    })
    .catch(e=>{
      console.log("error",e.message);
      this.main.createNotification("error",e.message)
    })
    .finally(()=>{
      this.loading=false
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
