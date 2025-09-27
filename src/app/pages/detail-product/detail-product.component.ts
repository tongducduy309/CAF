
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { async, firstValueFrom } from 'rxjs';
import { ProductInCartRequest } from 'src/app/dto/request/cart.request';
import { ReviewRequest } from 'src/app/dto/request/review.request';
import { ProductResponse } from 'src/app/dto/response/product.response';
import { ReviewResponse } from 'src/app/dto/response/review.response';
import { Product, ProductVariant } from 'src/app/models/product.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
export class DetailProductComponent implements OnInit {

  products_best_sell: any = [
  ]
  selectedSize: Partial<ProductVariant> = {};
  isFavorite = false;
  selected_img_product = 0;
  product: Partial<Product> = {}

  form_review: Partial<ReviewRequest> = {}

  rating_of_product: any = {
    point: 0
  }

  customer_reviews: ReviewResponse[] = []

  writing_review: any

  products_for_best: any = []

  isFormAddToCart = false
  isFormBuyNow = false

  product_form: Partial<ProductInCartRequest> = {}

  number_showing = 2

  count_of_level_point = [0, 0, 0, 0, 0]

  pid: any

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
  authService = inject(AuthenticationService)
  translate = inject(TranslateService)
  user$ = this.authService.user$

  constructor(private crud: CrudService, private route: ActivatedRoute, private router: Router, public main: MainService, private productService: ProductService,
    private reviewService: ReviewService
  ) {
    this.route.paramMap.subscribe(async (params) => {
      this.pid = params.get('id')




      try {
        const [product, reviews, bestProducts] = await Promise.all([
          this.getIdProduct(this.pid),
          this.getCustomerReviews(this.pid),
          this.getBestProducts(),
        ]);

        // set state 1 lần
        this.product = product;
        this.quantity = 1;
        this.selectedSize = product.variants?.[0] ?? {};

        this.customer_reviews = reviews;
        const sum = reviews.reduce((s, r) => s + (r.point ?? 0), 0);
        this.count_of_level_point = [0, 0, 0, 0, 0];
        reviews.forEach(r => { if (r.point) this.count_of_level_point[r.point - 1]++; });
        this.rating_of_product.customer = reviews.length;
        this.rating_of_product.point = reviews.length ? parseFloat((sum / reviews.length).toFixed(1)) : 0;

        this.products_for_best = bestProducts.slice(0, 2);
      } catch (err: any) {
        this.main.createNotification('error', err?.message ?? 'Có lỗi xảy ra');
      } finally {
        this.layoutService.setReady();
      }

    });
  }

  async ngOnInit(): Promise<void> {
    (await this.authService.fetchProfile()).subscribe()
    this.pageTitle.setTitle('DETAIL_PRODUCT.TITLE');

  }

  getIdProduct(id: string): Promise<Product> {
    return this.productService.getDetailProduct(id).then((res: Product) => {
      if (!res) this.router.navigate(['page-not-found'])
      return res;
    });
  }

  getCustomerReviews(id: string): Promise<ReviewResponse[]> {
    return this.reviewService.getReviewByProductId(id).then((res: ReviewResponse[]) => res);
  }

  getBestProducts(): Promise<ProductResponse[]> {
    return this.productService.getAllProducts().then((res: ProductResponse[]) => res);
  }




  writeReview() {
    this.form_review = {}
    this.writing_review = !this.writing_review
  }

  changeRating_Review(event: any) {
    this.form_review.point = event
    console.log(event);
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = '../../assets/images/example_product.png';
  }

  hoverRating_Review(event: any) {
    if (this.form_review.point == 0) {
      this.form_review.point = event
    }
  }

  async submitReview() {
    if (!this.form_review.point || this.form_review.point == 0) {
      this.main.createNotification("info", "Vui lòng chọn điểm đánh giá")
      return;
    }
    if (!this.form_review.comment || this.form_review.comment.trim().length == 0) {
      this.main.createNotification("info", "Vui lòng viết nhận xét")
      return;
    }

    // if (!this.form_review.name||this.form_review.name.trim().length==0){
    //   this.main.createNotification("info","Vui lòng điền họ và tên")
    //   return;
    // }
    // this.form_review.productNameId = this.product.nameId
    this.reviewService.createReview(this.form_review as ReviewRequest)

      .then(data => {
        this.main.createNotification("success", "Viết bài đánh giá thành công")
        this.getCustomerReviews(this.pid)

      })
      .catch(error => {
        console.error('Error:', error);
        this.main.createNotification("info", "Viết bài đánh giá không thành công")

      });
    this.writing_review = false;
  }

  changeQuantity(quantity: number) {
    this.quantity = quantity
  }


  async openFormAddToCart() {
    
    const user = await firstValueFrom(this.user$);
    if (user) {
      this.product_form = {
      name: this.product.name,
      size: this.selectedSize.size,
      productId: this.product.id,
      productVariantId: this.selectedSize.id,
      quantity: this.quantity
    }
    this.isFormAddToCart = true
    }
    else {
      this.main.createNotification("info", this.translate.instant("NOTIFICATION.INFO.LOGIN_REQUIRED"))
    }
  }

  async openFormBuyNow() {
    const user = await firstValueFrom(this.user$);
    if (user) {
      this.product_form = {
        name: this.product.name,
        size: this.selectedSize.size,
        productId: this.product.id,
        productVariantId: this.selectedSize.id,
        quantity: this.quantity
      }
      this.isFormBuyNow = true
    }
    else {
      this.main.createNotification("info", this.translate.instant("NOTIFICATION.INFO.LOGIN_REQUIRED"))
    }
  }

  showMore() {
    this.number_showing += 2
    if (this.number_showing > this.customer_reviews.length) {
      this.number_showing = this.customer_reviews.length
    }
  }

  seeSizingGuide() {
    this.nzImageService.preview(this.images);
  }





}
