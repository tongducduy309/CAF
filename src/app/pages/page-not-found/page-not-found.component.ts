import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/classes/page';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent extends Page implements OnInit{
  constructor (){
    super()
  }
  ngOnInit(): void {
    this.loaded()
  }
}
