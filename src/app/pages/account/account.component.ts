import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/classes/page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends Page implements OnInit {

  isMannageAddress = false

  constructor(private location:Location){
    super()
  }

  back(){
    this.location.back();
  }
  ngOnInit(): void {
    this.loaded()
  }

}
