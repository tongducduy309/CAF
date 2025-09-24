import { Component, inject, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss'],
    standalone: false
})
export class PageNotFoundComponent implements OnInit{
  private layoutService = inject(LayoutService)
  constructor (){
  }
  ngOnInit(): void {  
    this.layoutService.setReady()
  }
}
