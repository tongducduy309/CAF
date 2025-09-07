import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
    selector: 'app-search-page',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    standalone: false
})
export class SearchComponent {
  constructor(private location:Location){

  }
  back(){
    this.location.back();
  }
}
