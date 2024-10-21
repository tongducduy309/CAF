import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/classes/page';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent extends Page implements OnInit {

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
  selectedSize = 0;
  provinceData = ['Zhejiang', 'Jiangsu'];
  isFavorite = false;
  selected_img_product = 0;
  product:any = {
    sale:[],
    cost:[]
  };

  form_review:any = {
    point:0
  }

  rating_of_product:any = {
    point:0
  }

  customer_reviews: any = []

  writing_review:any

  constructor (private crud:CrudService, private route: ActivatedRoute, private router:Router, ){
    super();
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id')
      this.getIdProduct(id)
      this.getCustomerReviews(id)
    });
  }

  ngOnInit(): void {
  }

  getIdProduct(id:any){

    this.crud.get("products",id).subscribe((product:any)=>{
      if (product[0])
        this.product = product[0]
      if (Object.keys(this.product).length==0) this.router.navigate(["home"])
      this.product.quantity = 1
    this.selectedSize = 0
    console.log(this.product);

      if (!this.product) this.router.navigate(['page-not-found'])
    })

  }

  getCustomerReviews(id:any){
    this.crud.get('customer-reviews',id).subscribe((cs:any)=>{
      let sum = 0
      console.log(cs.length);
      for (let c of cs){
        sum+=c.point
        console.log(sum);
      }

      this.customer_reviews = cs
      this.rating_of_product.customer = cs.length
      if (cs.length>0){
        this.rating_of_product.point = Math.floor(sum/cs.length)
      }
    })
  }
  quantity = 1

  writeReview(){
    this.form_review = {}
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

  async submitReview(){
    this.crud.addData("customer-reviews",{...this.form_review,pid:this.product.id})
    .then(response => response)
    .then(data => {
        if (data.status) console.log("Successful Submit Review");
    })
    .catch(error => {
        console.error('Error:', error);

    });
  this.writing_review=false;
  }

  changeQuantity(){
    this.product.quantity = this.product.quantity.replace(/\D/g, '');
    if(this.product.quantity<1) this.product.quantity=1
  }

  removeQuantity(){
    if (this.product.quantity>1)
      this.product.quantity--;

  }

  addQuantity(){
    this.product.quantity++;

  }

  addToCart_(){
    const product_c = {
      pid:this.product.id,
      name:this.product.name,
      uid:'1',
      quantity:this.product.quantity,
      sale:this.product.sale[this.selectedSize],
      cost:this.product.cost[this.selectedSize],
      size:this.product.size[this.selectedSize]
    }
    this.addToCart(product_c)
  }


}
