import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/items/user.service';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Input() itemsCart = []
  subtotal = 0
  bg_header = 'transparent'

  categories: any = {}
  constructor (private user:UserService, private router:Router, private crud:CrudService){
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
  ngOnInit(): void {
    this.getCategories();
  }

  

  getCategories(){
    this.crud.get("categories","all").subscribe((categories:any)=>{
      this.categories.drinks = categories.filter((category:any)=>category.type==0)
      this.categories.food = categories.filter((category:any)=>category.type==1)
    })
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

  remote(page:any){
    this.router.navigate([page])
    this.visible = false;
  }

}
