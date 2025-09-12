import { P } from '@angular/cdk/portal-directives.d-BoG39gYN';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/classes/page';
import { ReviewRequest } from 'src/app/dto/request/ReviewRequest';
import { ProductResponse } from 'src/app/dto/response/ProductResponse';
import { ReviewResponse } from 'src/app/dto/response/ReviewResponse';
import { PageTitleService } from 'src/app/services/page-title.service';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
    selector: 'app-detail-product',
    templateUrl: './detail-product.component.html',
    styleUrls: ['./detail-product.component.scss'],
    standalone: false
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

  form_review:Partial<ReviewRequest> = {}

  rating_of_product:any = {
    point:0
  }

  customer_reviews: ReviewResponse[] = []

  writing_review:any

  products_for_best:any = []

  isFormAddToCart = false
  isFormBuyNow = false

  product_form:any = {}

  number_showing = 2

  count_of_level_point = [0,0,0,0,0]

  pid:any

  FILE_URL = environment.variable_global.FILE_URL;

  quantity = 1

  private pageTitle = inject(PageTitleService);


  constructor (private crud:CrudService, private route: ActivatedRoute, private router:Router, public main:MainService, private productService:ProductService,
    private reviewService:ReviewService
  ) {
    super();
    this.must_load=2
    this.route.paramMap.subscribe(async (params) => {
      this.pid = params.get('id')
      this.getIdProduct(this.pid)
      
      this.getCustomerReviews(this.pid)
      this.getBestProducts()
    });
  }

  ngOnInit(): void {
    this.pageTitle.setTitle('DETAIL_PRODUCT.TITLE');
  }

  getIdProduct(id:any){

    this.productService.getDetailProduct(id).then((res:ProductResponse)=>{
     
      if (res)
        this.product = res

      else this.router.navigate(["home"])
      this.product.quantity = 1
    this.selectedSize = 0
    this.loaded()
    console.log(this.product);

      if (!this.product) this.router.navigate(['page-not-found'])
    })

  }

  getCustomerReviews(id:string){
    this.reviewService.getReviewByProductId(id).then((res:ReviewResponse[])=>{
      let sum = 0
      const cs = res
      for (let c of cs){
        this.count_of_level_point[c.point-1]++
        sum+=c.point
        console.log(sum);
      }

      this.customer_reviews = cs
      console.log(cs);
      this.rating_of_product.customer = cs.length
      if (cs.length>0){
        this.rating_of_product.point = (sum/cs.length).toFixed(1)
      }
      this.loaded()
    })
  }

  getBestProducts(){
    this.productService.getAllProducts().then((res:ProductResponse[])=>{
      this.products_for_best=res.slice(0,2)

    }).catch((err)=>{
      console.log(err);
    })
  }
  

  

  writeReview(){
    this.form_review = {}
    this.writing_review = !this.writing_review
  }

  changeRating_Review(event:any){
    this.form_review.point = event
    console.log(event);
  }

  onImgError(event: Event) {
  (event.target as HTMLImageElement).src = '../../assets/images/example_product.png';
}

  hoverRating_Review(event:any){
    if (this.form_review.point==0){
      this.form_review.point = event
    }
  }

  async submitReview(){
    if (!this.form_review.point||this.form_review.point==0){
      this.main.createNotification("info","Vui lòng chọn điểm đánh giá")
      return;
    }
    if (!this.form_review.comment||this.form_review.comment.trim().length==0){
      this.main.createNotification("info","Vui lòng viết nhận xét")
      return;
    }

    // if (!this.form_review.name||this.form_review.name.trim().length==0){
    //   this.main.createNotification("info","Vui lòng điền họ và tên")
    //   return;
    // }
    this.form_review.productNameId = this.product.nameId
    this.reviewService.createReview(this.form_review as ReviewRequest)

    .then(data => {
        this.main.createNotification("success","Viết bài đánh giá thành công")
          this.getCustomerReviews(this.pid)
        
    })
    .catch(error => {
        console.error('Error:', error);
        this.main.createNotification("info","Viết bài đánh giá không thành công")

    });
  this.writing_review=false;
  }

  changeQuantity(){
    this.product.quantity = this.product.quantity.replace(/\D/g, '');
    if(this.product.quantity<1) this.product.quantity=1
    if(this.product.quantity>99) this.product.quantity=99
  }

  removeQuantity(){
    if (this.product.quantity>1)
      this.product.quantity--;

  }

  addQuantity(){
    if (this.product.quantity<99)
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

  showMore(){
    this.number_showing+=2
    if (this.number_showing>this.customer_reviews.length){
      this.number_showing=this.customer_reviews.length
    }
  }





}
