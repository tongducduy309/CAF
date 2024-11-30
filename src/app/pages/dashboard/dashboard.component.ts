import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Page } from 'src/app/classes/page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends Page implements AfterViewInit{
  isCollapsed = false;
  titlePage = ''

  constructor (private router:Router){
    super();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
    {
        this.titlePage = event.url.split("/")[2]
        console.log(this.titlePage);

      }
    });
  }

  remote(page:any){
    this.router.navigate(['dashboard/'+page])
    this.titlePage = page
  }
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
