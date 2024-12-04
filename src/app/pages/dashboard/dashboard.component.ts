import { Component} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Page } from 'src/app/classes/page';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends Page{
  isCollapsed = false;
  titlePage = ''

  constructor (private router:Router, private crud:CrudService, private main:MainService, private userS:UserService){
    super();

    this.checkUser()

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
    {
        this.titlePage = event.url.split("/")[2]
        console.log(this.titlePage);

      }
    });
  }

  async checkUser(){
    const user = this.main.getCookie("u-caf")
    this.crud.get("check-admin",user.token).subscribe((res:any)=>{
      if (res.result=='success'){
        this.main.createNotification("success","Bảng điều khiển")
        this.loaded()
      }
      else this.router.navigate(['page-not-found'])
    })
  }

  remote(page:any){
    this.router.navigate(['dashboard/'+page])
    this.titlePage = page
  }

}
