import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/classes/page';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent extends Page implements OnInit {

  // imgs = [
  //   "https://coffee-workdo.myshopify.com/cdn/shop/products/1_f05ae8de-129a-4d3f-afba-d062e1ffb1d8_600x600.png?v=1672659207",
  //   "https://coffee-workdo.myshopify.com/cdn/shop/products/1_f05ae8de-129a-4d3f-afba-d062e1ffb1d8_600x600.png?v=1672659207",
  //   "https://coffee-workdo.myshopify.com/cdn/shop/products/3_23b7a8b2-85c6-4826-bbb5-0274ec262ef1_600x600.png?v=1672659207",
  //   "https://coffee-workdo.myshopify.com/cdn/shop/products/1_f05ae8de-129a-4d3f-afba-d062e1ffb1d8_600x600.png?v=1672659207",

  // ]
  products_best_sell:any=[
  ]
  selectedSize = 0;
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

  products_for_best:any = []

  isFormAddToCart = false
  isFormBuyNow = false

  product_form:any = {}


  constructor (private crud:CrudService, private route: ActivatedRoute, private router:Router, public main:MainService){
    super();
    this.must_load=2
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id')
      this.getIdProduct(id)
      this.getCustomerReviews(id)
      this.getBestProducts()
    });
  }

  ngOnInit(): void {
  }

  getIdProduct(id:any){

    this.crud.get("products",id).subscribe((res:any)=>{
      const product =res.data
      if (product[0])
        this.product = product[0]

      if (Object.keys(this.product).length==0) this.router.navigate(["home"])
      this.product.quantity = 1
    this.selectedSize = 0
    this.loaded()
    console.log(this.product);

      if (!this.product) this.router.navigate(['page-not-found'])
    })

  }

  getCustomerReviews(id:any){
    this.crud.get('customer-reviews',id).subscribe((res:any)=>{
      let sum = 0
      const cs = res.data
      for (let c of cs){
        sum+=c.point
        console.log(sum);
      }

      this.customer_reviews = cs
      this.rating_of_product.customer = cs.length
      if (cs.length>0){
        this.rating_of_product.point = Math.floor(sum/cs.length)
      }
      this.loaded()
    })
  }

  getBestProducts(){
    this.crud.get("products-by-customer-reviews","2").subscribe((res:any)=>{
      this.products_for_best=res.data

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
    this.crud.addData("customer-reviews",{...this.form_review,name_id:this.product.name_id})
    .then(response => response.json())
    .then(data => {
        if (data.result='success') {
          this.main.createNotification("success","Viết bài đánh giá thành công")
        }
        else{
          this.main.createNotification("info","Viết bài đánh giá không thành công")
        }
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

  AddToCart(product:any){
    console.log("Add To Cart");
    console.log(this.product);
    const product_c = {
      id:this.product.id[this.selectedSize],
      pid:this.product.id,
      name:this.product.name,
      quantity:product.quantity,
      sale:this.product.sale[this.selectedSize],
      cost:this.product.cost[this.selectedSize],
      size:this.product.size[this.selectedSize],
      name_id: this.product.name_id,
      note:product.note
    }
    this.addToCart(product_c)
  }

  openFormAddToCart(){
    this.product_form = {...this.product}
    this.product_form["note"]=''
    this.product_form["sizeSelected"] = this.product.size[this.selectedSize]
    this.isFormAddToCart = true
  }

  openFormBuyNow(){
    this.product_form = {...this.product}
    this.product_form["note"]=''
    this.product_form["sizeSelected"] = this.product.size[this.selectedSize]
    this.isFormBuyNow = true
  }

  BuyNow(product:any){
    const product_c = {
      id:this.product.id[this.selectedSize],
      quantity:product.quantity,
      note:product.note
    }
    console.log(`checkout?id=${product_c.id}&quantity=${product_c.quantity}&note=${product_c.note}`);
    this.router.navigate([`checkout`],{ queryParams: {...product_c} })
  }



}
