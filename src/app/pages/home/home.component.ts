import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Page } from 'src/app/classes/page';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends Page implements OnInit{
  title_button= "Login"
  list_product = [
    {
      img:'https://tulieuvankien.dangcongsan.vn/Uploads/2018/7/5/4/united_kingdom.jpg',
      name:'Tên Sản Phẩm 1',
      price:'10.000'
    }
  ]
  namepush = ''

  products_best_discount: any = []

  constructor (private crud:CrudService, private route:Router, private elRef: ElementRef){
    super()
  }
  ngOnInit(): void {

    this.animationFirstSectionContent();
    this.getAllProducts();
  }


  // ============================GET DATA=============================
  getAllProducts(){
    this.crud.get('products','all').subscribe((data)=>{
      this.products_best_discount=data
      console.log(this.products_best_discount);
      this.loaded()
    });

  }
  change(){
    this.route.navigate(['login'])
  }

  animationFirstSectionContent(){
    const contents = [
      'Chocolate Coffee',
    'Choose the origin of the coffee',
    'Freshly roasted coffee <b>and barista accessories.</b>'
    ]
    const content = this.elRef.nativeElement.querySelector('.banner-center-content .content')
    let i=0
    setInterval(()=>{
      content.innerHTML = contents[i++]
      if (i==3) i=0
    },2000)
  }


}
