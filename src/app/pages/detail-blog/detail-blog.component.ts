import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss']
})
export class DetailBlogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
    }
  ]

}
