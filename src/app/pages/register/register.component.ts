import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
