import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title_button= "Login"
  list_product = [
    {
      img:'https://tulieuvankien.dangcongsan.vn/Uploads/2018/7/5/4/united_kingdom.jpg',
      name:'Tên Sản Phẩm 1',
      price:'10.000'
    }
  ]
  namepush = ''


  constructor ( private route:Router){

  }

  change(){
    this.route.navigate(['login'])
  }


}
