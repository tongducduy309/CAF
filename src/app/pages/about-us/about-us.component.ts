import { AfterViewInit, Component } from '@angular/core';
import { Location } from '@angular/common';
import { Page } from 'src/app/classes/page';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent extends Page implements AfterViewInit{
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
