import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Page } from 'src/app/classes/page';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent extends Page implements OnInit {

  constructor(private location:Location){
    super()
  }
  back(){
    this.location.back();
  }

  ngOnInit(): void {
    this.loaded()
  }

  blogs = [
    {
      id: '1',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/articles/image_25.png?v=1672400766',
      title: 'From our passion to your single cup of coffee',
      content: 'Coffee is a beverage brewed from the roasted and ground seeds of the tropical evergreen coffee plant. Coffee is one...'
    },
    {
      id: '2',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/articles/image_24.png?v=1672400763',
      title: 'Smooth and creamy delicious cup of coffee',
      content: 'Of the two main species grown, arabica coffee (from C. arabica) is generally more highly regarded than robusta coffee (from...'
    },
    {
      id: '3',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/articles/image_23.png?v=1672400758',
      title: 'We bring the coffee served in the restaurants',
      content: 'The traditional method of planting coffee is to place 20 seeds in each hole at the beginning of the rainy...'
    },
    {
      id: '4',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/articles/image_22.png?v=1672400712',
      title: 'Get new mind blowing experience every day',
      content: 'This means that useful forms and hybrids must be propagated vegetatively. Cuttings, grafting, and budding are the usual methods of...'
    },
    {
      id: '5',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/articles/image_19.png?v=1672400701',
      title: 'Create delicious memories with each cup',
      content: 'Coffea canephora is less susceptible to disease than C. arabica and can be cultivated in lower altitudes and warmer climates...'
    },
    {
      id: '6',
      img: 'https://coffee-workdo.myshopify.com/cdn/shop/articles/image_21.png?v=1672400699',
      title: 'Freshly roasted dripped coffee for all moment',
      content: 'Coffea arabica is predominantly self-pollinating, and as a result, the seedlings are generally uniform and vary little from their parents....'
    }
  ]

}
