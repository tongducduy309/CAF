import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.scss']
})
export class ManageAccountsComponent {

  accounts:any = []
  constructor(private router:Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
    {
        // this.titlePage = event.url.split("/")[2]
        // console.log(this.titlePage);

      }
    });
  }

  blockAccount(id:any){

  }
}
