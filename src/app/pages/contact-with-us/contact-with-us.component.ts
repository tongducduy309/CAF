import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Page } from 'src/app/classes/page';
import { Location } from '@angular/common';
import { PageTitleService } from 'src/app/services/page-title.service';
@Component({
    selector: 'app-contact-with-us',
    templateUrl: './contact-with-us.component.html',
    styleUrls: ['./contact-with-us.component.scss'],
    standalone: false
})
export class ContactWithUsComponent extends Page implements AfterViewInit,OnInit{
    private pageTitle = inject(PageTitleService);
    constructor(private location:Location){
    super();
  }
  ngOnInit(): void {
    this.pageTitle.setTitle('CONTACT.TITLE');
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
