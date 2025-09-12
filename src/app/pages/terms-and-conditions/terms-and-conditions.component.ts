import { Location } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Page } from 'src/app/classes/page';
import { PageTitleService } from 'src/app/services/page-title.service';

@Component({
    selector: 'app-terms-and-conditions',
    templateUrl: './terms-and-conditions.component.html',
    styleUrls: ['./terms-and-conditions.component.scss'],
    standalone: false
})
export class TermsAndConditionsComponent extends Page implements AfterViewInit,OnInit{
  private pageTitle = inject(PageTitleService);
  constructor(private location:Location){
    super()
  }
  ngOnInit(): void {
    this.pageTitle.setTitle('TERMS_AND_CONDITIONS.TITLE');
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
