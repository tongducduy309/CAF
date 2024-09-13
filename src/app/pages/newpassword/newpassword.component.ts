import { Component } from '@angular/core';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent {
  user_email = ''
  user_password = ''
  passwordVisible = false;
  message = ''
  isFormLogin = true;

  isValidEmail_RPW = true

  resetYP_email = ''

  submit(){
    
  }
}
