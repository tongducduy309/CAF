import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  isFormLogin = true;

  isValidEmail_RPW = true

  resetYP_email = ''

  constructor (private crud:CrudService,private notification: NzNotificationService, private route:Router){

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

  register(){
    this.sendEmail('recipient@example.com', 'Test Email', 'This is a test email sent from TypeScript.');
    //this.route.navigate(['register'])
  }

  submit_resetPW(){
    this.isValidEmail_RPW=this.isValidEmail(this.resetYP_email)
    if (this.isValidEmail_RPW){

    }
  }

  isValidEmail(email:string){
    if (email.length==0) return false
    if (email.indexOf("@")==-1) return false
    return true
  }

  focusEmail_RPW(){
    this.isValidEmail_RPW=true
  }


async sendEmail(recipient: string, subject: string, body: string) {
  // Create a Nodemailer transporter using SMTP
  // const nodemailer = require("nodemailer");
  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.gmail.com',
  //   port: 465,
  //   secure: true, // Use SSL/TLS for security
  //   auth: {
  //     user: 'tongducduyy@gmail.com',
  //     pass: 'qxuo gfpd gbhr zatu',
  //   },
  // });

  // // Compose the email message
  // const mailOptions = {
  //   from: 'gipas309@gmail.com',
  //   to: recipient,
  //   subject,
  //   text: '<h1>Hello</h1>',
  // };

  // // Send the email
  // await transporter.sendMail(mailOptions);
  // console.log('Email sent successfully!');
}

// Example usage

}
