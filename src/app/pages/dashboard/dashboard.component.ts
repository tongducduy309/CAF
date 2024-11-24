import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Page } from 'src/app/classes/page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends Page implements AfterViewInit{
  isCollapsed = false;
  ngAfterViewInit(): void {
    Promise.resolve().then(()=> {
      // this.getUser()
      this.loaded()
    })
  }
  // ngOnInit(): void {
  //   this.loaded()
  // }

}
