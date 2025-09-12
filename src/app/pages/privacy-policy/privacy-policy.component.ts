import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Page } from 'src/app/classes/page';
import { PageTitleService } from 'src/app/services/page-title.service';
@Component({
    selector: 'app-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.scss'],
    standalone: false
})
export class PrivacyPolicyComponent  extends Page implements AfterViewInit,OnInit{
  private pageTitle = inject(PageTitleService);
  constructor(private location:Location){
    super()
  }
  ngOnInit(): void {
    this.pageTitle.setTitle('PRIVACY_POLICY.TITLE');
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
