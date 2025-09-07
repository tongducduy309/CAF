import { AfterViewInit, Component } from '@angular/core';
import { Location } from '@angular/common';
import { Page } from 'src/app/classes/page';
@Component({
    selector: 'app-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.scss'],
    standalone: false
})
export class PrivacyPolicyComponent  extends Page implements AfterViewInit{
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
