import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  title_button= "Login"
  list_product = [
    {
      img:'https://tulieuvankien.dangcongsan.vn/Uploads/2018/7/5/4/united_kingdom.jpg',
      name:'Tên Sản Phẩm 1',
      price:'10.000'
    }
  ]
  namepush = ''


  constructor ( private route:Router, private elRef: ElementRef){

  }
  ngOnInit(): void {
    this.animationFirstSectionContent();
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
