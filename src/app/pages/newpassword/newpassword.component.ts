import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent implements OnInit{

  user_email = ''
  user_password = ''
  passwordVisible = false;
  message = ''
  isFormLogin = true;

  isValidEmail_RPW = true

  resetYP_email = ''

  token:any = ''

  constructor(private route:Router, private routed:ActivatedRoute){

  }

  ngOnInit(): void {
    this.routed.paramMap.subscribe((params: any) => {
      this.token = params.get('token');

    });
  }

  submit(){

  }
}
