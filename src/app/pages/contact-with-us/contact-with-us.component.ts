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
export class ContactWithUsComponent implements OnInit {
  private pageTitle = inject(PageTitleService);
  constructor(private location: Location) {

  }
  ngOnInit(): void {
    this.pageTitle.setTitle('CONTACT.TITLE');
  }
  back() {
    this.location.back();
  }
}
