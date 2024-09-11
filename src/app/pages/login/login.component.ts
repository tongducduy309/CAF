import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user_email = ''
  user_password = ''
  passwordVisible = false;
  message = ''

  constructor (private crud:CrudService,private notification: NzNotificationService){

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
      'Thông Báo',
      message
    );
  }
}
