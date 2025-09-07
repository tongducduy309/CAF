import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss'],
    standalone: false
})
export class BlogComponent implements OnInit {
  @Input() blog = {
    id: '1',
    img: 'https://coffee-workdo.myshopify.com/cdn/shop/articles/image_25.png?v=1672400766',
    title: 'From our passion to your single cup of coffee',
    content: 'Coffee is a beverage brewed from the roasted and ground seeds of the tropical evergreen coffee plant. Coffee is one...'
  }

  constructor(public route:Router) {}

  ngOnInit(): void {
  }

}
