import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  imgs = [
    "https://coffee-workdo.myshopify.com/cdn/shop/products/1_f05ae8de-129a-4d3f-afba-d062e1ffb1d8_600x600.png?v=1672659207",
    "https://coffee-workdo.myshopify.com/cdn/shop/products/1_f05ae8de-129a-4d3f-afba-d062e1ffb1d8_600x600.png?v=1672659207",
    "https://coffee-workdo.myshopify.com/cdn/shop/products/3_23b7a8b2-85c6-4826-bbb5-0274ec262ef1_600x600.png?v=1672659207",
    "https://coffee-workdo.myshopify.com/cdn/shop/products/1_f05ae8de-129a-4d3f-afba-d062e1ffb1d8_600x600.png?v=1672659207",

  ]
  products=[
    {
      id:'1',
      img:'https://coffee-workdo.myshopify.com/cdn/shop/products/1_f9e82651-1554-4bdc-a3bd-a8f8d1c454eb_600x600.png?v=1672658975',
      name:'Tên sản phẩm 1',
      price:'20.000',
      cost:'40.000',
    },
    {
      id:'2',
      img:'https://coffee-workdo.myshopify.com/cdn/shop/products/1_f05ae8de-129a-4d3f-afba-d062e1ffb1d8_600x600.png?v=1672659207',
      name:'Tên sản phẩm 2',
      price:'10.000' ,
      cost:'0',
    },
    {
      id:'3',
      img:'https://coffee-workdo.myshopify.com/cdn/shop/products/1_f9e82651-1554-4bdc-a3bd-a8f8d1c454eb_600x600.png?v=1672658975',
      name:'Tên sản phẩm 3',
      price:'10.000' ,
      cost:'0',
    },
    {
      id:'4',
      img:'https://coffee-workdo.myshopify.com/cdn/shop/products/1_f9e82651-1554-4bdc-a3bd-a8f8d1c454eb_600x600.png?v=1672658975',
      name:'Tên sản phẩm 4',
      price:'10.000' ,
      cost:'0',
    }
  ]
  selectedProvince = 'Zhejiang';
  provinceData = ['Zhejiang', 'Jiangsu'];
  isFavorite = false;
  selected_img_product = 0;
  product:any = {
  };

  form_review:any = {
    point:0
  }

  rating_of_product:any = {

  }

  writing_review:any

  constructor (private crud:CrudService, private route: ActivatedRoute, private router:Router, ){
    this.route.paramMap.subscribe(async (params) => {
      await this.getIdProduct(params.get('id'))
    });
  }

  ngOnInit(): void {
  }

  getIdProduct(id:any){

    this.crud.getProducts(id).subscribe((product)=>{
      this.product = product
      this.rating_of_product.point = 3
      this.rating_of_product.customer = 2
      if (!this.product) this.router.navigate(['page-not-found'])
    })

  }

  writeReview(){
    if (this.writing_review){
      this.form_review = {}
    }
    this.writing_review = !this.writing_review
  }

  changeRating_Review(event:any){
    this.form_review.point = event
    console.log(event);
  }

  hoverRating_Review(event:any){
    if (this.form_review.point==0){
      this.form_review.point = event
    }
  }

  submitReview(){
    this.crud.addData("customer-reviews",this.form_review).subscribe(response => {
      console.log("Successful");
  }, error => {
      console.error('Error:', error);
  });
  }
}
