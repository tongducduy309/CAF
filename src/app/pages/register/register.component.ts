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
  fullname = ''
  Email_Fill = ''
  Password_Fill = ''

  submited = false

  user:any = null

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


    if (!this.fullname.trim()) {
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

    this.crud.addData("register",{
      email:this.Email_Fill,
      fullname:this.fullname,
      password:this.Password_Fill
    })


    // this.crud.addNewData('users',this.Email_Fill,{
    //   firstName: this.FirstName_Fill,
    //   lastName: this.LastName_Fill,
    //   password:this.Password_Fill,
    //   email: this.Email_Fill
    // })

    this.submited = true

    // this.createNotification('success', 'Thanks for registering!');


    // this.fullname = '';
    // this.Email_Fill = '';
    // this.Password_Fill = '';
  }
}
