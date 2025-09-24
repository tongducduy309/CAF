import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { PageTitleService } from 'src/app/services/page-title.service';

@Component({
    selector: 'app-terms-and-conditions',
    templateUrl: './terms-and-conditions.component.html',
    styleUrls: ['./terms-and-conditions.component.scss'],
    standalone: false
})
export class TermsAndConditionsComponent implements OnInit{
  private pageTitle = inject(PageTitleService);
  private layoutService = inject(LayoutService)
  constructor(private location:Location){

  }
  ngAfterViewInit(): void {
    
  }
  ngOnInit(): void {
    this.pageTitle.setTitle('TERMS_AND_CONDITIONS.TITLE');
    this.layoutService.setReady()

  }
  back(){
    this.location.back();
  }
}
