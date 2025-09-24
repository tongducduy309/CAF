import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Page } from 'src/app/classes/page';
import { PageTitleService } from 'src/app/services/page-title.service';
import { LayoutService } from 'src/app/services/layout.service';
@Component({
    selector: 'app-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.scss'],
    standalone: false
})
export class PrivacyPolicyComponent implements OnInit{
  private pageTitle = inject(PageTitleService);
  private layoutService = inject(LayoutService)
  constructor(private location:Location){
  }
  ngOnInit(): void {
    this.pageTitle.setTitle('PRIVACY_POLICY.TITLE');
    this.layoutService.setReady()
  }
  back(){
    this.location.back();
  }
}
