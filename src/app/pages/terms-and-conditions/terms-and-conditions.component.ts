import { Location } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Page } from 'src/app/classes/page';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent extends Page implements AfterViewInit{
  constructor(private location:Location){
    super()
  }
  back(){
    this.location.back();
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(()=> {
      // this.getUser()
      this.loaded()
    })

  }
}
