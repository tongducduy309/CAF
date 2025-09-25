import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogHTMLResponse } from 'src/app/dto/response/blog.response';
import { BlogService } from 'src/app/services/blog.service';
import { numberToStringMonth } from 'src/app/utils/Date';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss'],
  standalone: false
})
export class DetailBlogComponent implements OnInit {

  blogService = inject(BlogService)
  route = inject(ActivatedRoute)
  main = inject(MainService)
  loading=true;
  blog:Partial<BlogHTMLResponse>={}

  numberToStringMonth = (month:number) =>{
    return numberToStringMonth(month)
  }

  constructor(private location:Location) {
    this.route.paramMap.subscribe(async (params) => {
      const slug = params.get('slug');
      if (slug) {
        this.getBlogBySlug(slug);
      }
    });
  }

  ngOnInit(): void {

  }

  getBlogBySlug(slug: string) {
    this.blogService.getDetailBlogBySlug(slug).then((res:BlogHTMLResponse)=>{
      this.blog = res
      console.log(res)
    }).catch(e=>{
      this.main.createNotification("error",e.message)
    }).finally(()=>{
      this.loading=true
    })
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

  back(){
    this.location.back();
  }

}
