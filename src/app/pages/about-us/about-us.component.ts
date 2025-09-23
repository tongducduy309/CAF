import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Page } from 'src/app/classes/page';
import { PageTitleService } from 'src/app/services/page-title.service';
@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss'],
    standalone: false
})
export class AboutUsComponent implements OnInit{
  private pageTitle = inject(PageTitleService);
  constructor(private location:Location){

  }
  ngOnInit(): void {
    this.pageTitle.setTitle('ABOUT_US.TITLE');
  }
  back(){
    this.location.back();
  }

}
