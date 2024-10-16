import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/items/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() itemsCart = []
  subtotal = 0
  bg_header = 'transparent'
  constructor (private user:UserService, private router:Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)  
   {
        // Route change detected
        switch (event.urlAfterRedirects){
          case '/home':
            this.bg_header = 'transparent'
            break
          default:
            this.bg_header = '#000';
        }
      }
    });
  }
  account(){
    if (this.user.isVerify==false){
      this.router.navigate(["account/login"])
    }
  }

  visible = false;
  isPromoCode:any = -1;
  isGift:any = -1;
  checkedGift = false;


  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  remoteCart(){
    this.router.navigate(['cart'])
    this.visible = false;
  }

  remoteAllProduct(){
    this.router.navigate(['all-products'])
    this.visible = false;
  }
}
