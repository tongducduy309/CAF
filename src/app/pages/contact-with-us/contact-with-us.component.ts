import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Page } from 'src/app/classes/page';
import { Location } from '@angular/common';
import { PageTitleService } from 'src/app/services/page-title.service';
import { LayoutService } from 'src/app/services/layout.service';
@Component({
  selector: 'app-contact-with-us',
  templateUrl: './contact-with-us.component.html',
  styleUrls: ['./contact-with-us.component.scss'],
  standalone: false
})
export class ContactWithUsComponent implements OnInit {
  private pageTitle = inject(PageTitleService);
  private layoutService = inject(LayoutService)
  constructor(private location: Location) {

  }
  ngOnInit(): void {
    this.pageTitle.setTitle('CONTACT.TITLE');
    this.layoutService.setReady()
  }
  back() {
    this.location.back();
  }
}
