import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Page } from 'src/app/classes/page';
import { PageTitleService } from 'src/app/services/page-title.service';
import { LayoutService } from 'src/app/services/layout.service';
@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss'],
    standalone: false
})
export class AboutUsComponent implements OnInit{
  private pageTitle = inject(PageTitleService);
  private layoutService = inject(LayoutService)
  constructor(private location:Location){

  }
  ngOnInit(): void {
    this.pageTitle.setTitle('ABOUT_US.TITLE');
    this.layoutService.setReady()
  }
  back(){
    this.location.back();
  }

}
