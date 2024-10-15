import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/items/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor (private user:UserService, private route:Router){

  }
  account(){
    if (this.user.isVerify==false){
      this.route.navigate(["account/login"])
    }
  }

  visible = false;
  isPromoCode = true;
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
