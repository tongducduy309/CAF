import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  FirstName_Fill = ''
  LastName_Fill = ''
  Email_Fill = ''
  Password_Fill = ''

  constructor(private crud:CrudService,private notification: NzNotificationService, public route:Router, private routed: ActivatedRoute) {}

  ngOnInit(): void {}

  isValidEmail(email:string){
    if (email.length==0) return false
    if (email.indexOf("@")==-1) return false
    return true
  }

  isValidPassword(password:string){
    if (password.length==0) return false
    return true
  }

  createNotification(type: string, message: string): void {
    this.notification.create(
      type,
      'Notification',
      message
    );
  }



  SendMess_Register(){

    if (!this.FirstName_Fill.trim()) {
      this.createNotification('error', 'First Name is required.');
      return;
    }

    if (!this.LastName_Fill.trim()) {
      this.createNotification('error', 'Last Name is required.');
      return;
    }

    if (!this.isValidEmail(this.Email_Fill)) {
      this.createNotification('error', 'Invalid Email. Ensure it contains a "@" symbol.');
      return;
    }

    if (!this.isValidPassword(this.Password_Fill)) {
      this.createNotification('error', 'Invalid Password. Ensure it contains a special character and is at least 8 characters long.');
      return;
    }


    // this.crud.addNewData('users',this.Email_Fill,{
    //   firstName: this.FirstName_Fill,
    //   lastName: this.LastName_Fill,
    //   password:this.Password_Fill,
    //   email: this.Email_Fill
    // })

    this.createNotification('success', 'Thanks for registering!');


    this.FirstName_Fill = '';
    this.LastName_Fill = '';
    this.Email_Fill = '';
    this.Password_Fill = '';
  }
}
