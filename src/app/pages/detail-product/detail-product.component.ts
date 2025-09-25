
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzImageService } from 'ng-zorro-antd/image';
import { Page } from 'src/app/classes/page';
import { ProductInCartRequest } from 'src/app/dto/request/cart.request';
import { ReviewRequest } from 'src/app/dto/request/review.request';
import { ProductResponse } from 'src/app/dto/response/product.response';
import { ReviewResponse } from 'src/app/dto/response/review.response';
import { Product, ProductVariant } from 'src/app/models/product.model';
import { LayoutService } from 'src/app/services/layout.service';
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
export class DetailProductComponent extends Page implements OnInit,AfterViewInit {

  products_best_sell:any=[
  ]
  selectedSize:Partial<ProductVariant> = {};
  isFavorite = false;
  selected_img_product = 0;
  product:Partial<Product>={}

  form_review:Partial<ReviewRequest> = {}

  rating_of_product:any = {
    point:0
  }

  customer_reviews: ReviewResponse[] = []

  writing_review:any

  products_for_best:any = []

  isFormAddToCart = false
  isFormBuyNow = false

  product_form:Partial<ProductInCartRequest> = {}

  number_showing = 2

  count_of_level_point = [0,0,0,0,0]

  pid:any

  FILE_URL = environment.variable_global.FILE_URL;

  quantity = 1

  layoutService = inject(LayoutService)
  nzImageService = inject(NzImageService)

  readonly images = [
    {
      src: 'https://img.alicdn.com/tfs/TB1g.mWZAL0gK0jSZFtXXXQCXXa-200-200.svg',
      width: '200px',
      height: '200px',
      alt: 'ng-zorro'
    }
  ];

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
  ngAfterViewInit(): void {
    this.layoutService.setReady()
  }

  ngOnInit(): void {
    this.pageTitle.setTitle('DETAIL_PRODUCT.TITLE');
    
  }

  getIdProduct(id:any){

    this.productService.getDetailProduct(id).then((res:Product)=>{
     
      if (res)
        this.product = res

      else this.router.navigate(["home"])
      this.quantity = 1
      this.selectedSize = this.product.variants?this.product.variants[0]:{}
    this.loaded()

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
    // this.form_review.productNameId = this.product.nameId
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

  changeQuantity(quantity:number){
    this.quantity = quantity
  }


  openFormAddToCart(){
    this.product_form = {
      name:this.product.name,
      size:this.selectedSize.size,
      productId:this.product.id,
      productVariantId:this.selectedSize.id,
      quantity:this.quantity
    }
    this.isFormAddToCart = true
  }

  openFormBuyNow(){
    this.product_form = {...this.product}
    this.product_form["note"]=''
    // this.product_form["sizeSelected"] = this.product.size[this.selectedSize]
    this.isFormBuyNow = true
  }

  BuyNow(product:any){
    const product_c = {
      // id:this.product.id[this.selectedSize],
      quantity:product.quantity,
      note:product.note
    }
    // console.log(`checkout?id=${product_c.id}&quantity=${product_c.quantity}&note=${product_c.note}`);
    this.router.navigate([`checkout`],{ queryParams: {...product_c} })
  }

  showMore(){
    this.number_showing+=2
    if (this.number_showing>this.customer_reviews.length){
      this.number_showing=this.customer_reviews.length
    }
  }

  seeSizingGuide(){
    this.nzImageService.preview(this.images);
  }





}
