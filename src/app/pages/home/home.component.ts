import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { LangService } from 'src/app/services/lang.service';
import { LayoutService } from 'src/app/services/layout.service';
import { PageTitleService } from 'src/app/services/page-title.service';
import { CrudService } from 'src/services/crud.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit, OnDestroy{
  title_button= "Login"
  list_product = [
    {
      img:'https://tulieuvankien.dangcongsan.vn/Uploads/2018/7/5/4/united_kingdom.jpg',
      name:'Tên Sản Phẩm 1',
      price:'10.000'
    }
  ]
  namepush = ''

  loading = true

  products_best_discount: any = []

  products_by_cate: any = {}

  selected_tab = 2

  categories:any = []

  best_customer_reviews:any = []

  currentContent!: SafeHtml;
  private idx = 0;

  private intervalId: any = null;
  private animating = false;

  private readonly FADE_DURATION = 800; 
  private readonly INTERVAL = 3000;

  @ViewChild('contentElem', { static: true }) contentElem!: ElementRef<HTMLElement>;

  private contents: string[] = [
    'Cà phê đậm vị',
    'Trái cây nguyên chất',
    'Thơm mát ngọt vị.'
  ];

  private lang = inject(LangService);

  private pageTitle = inject(PageTitleService);

  constructor (private crud:CrudService, private route:Router, private elRef: ElementRef, private sanitizer: DomSanitizer){
    this.currentContent = this.sanitizer.bypassSecurityTrustHtml(this.contents[this.idx]);
  }

  layoutService = inject(LayoutService)
  ngOnInit(): void {
    this.pageTitle.setTitle('HOME.TITLE');
    this.animationFirstSectionContent();
    this.getAllProducts();
    // this.getCategories();
    this.getBestCustomerReviews();
    this.intervalId = setInterval(() => this.animationFirstSectionContent(), this.INTERVAL);
  }


  // ============================GET DATA=============================
  getAllProducts(){
    this.crud.get('products','all').subscribe((res:any)=>{
      const data = res.data
      this.products_best_discount = data.sort((a:any, b:any) =>  b.sale.reduce((a:any, b:any) => a + b, 0) - a.sale.reduce((a:any, b:any) => a + b, 0)).slice(0,4);
      this.products_by_cate = {}
      for (let p of data){
        if (!(p.cid in this.products_by_cate)){
          this.products_by_cate[p.cid] = [p]
        }
        else {
          if (this.products_by_cate[p.cid].length<6)
          this.products_by_cate[p.cid].push(p)
        }
      }

      console.log(this.products_by_cate);
      
    },()=>{},()=>{this.layoutService.setReady();});

  }

  // getCategories(){

  //   this.crud.get("categories","all").subscribe((categories:any)=>{
  //     // this.categories.drinks = categories.filter((category:any)=>category.type==0)
  //     // this.categories.food = categories.filter((category:any)=>category.type==1)
  //     // this.categories = []
  //     // Object.keys(categories).forEach((key:any)=>{
  //     //   this.categories.push({
  //     //     name:key,
  //     //     values:categories[key]
  //     //   })
  //     // })
  //     this.categories=categories.slice(0,6)
  //     console.log(categories);
  //     this.loaded()
  //   })
  // }

  getProductsBestDiscount(){

  }

  onError(ev: any) {
    console.error('Video error', ev);
    // fallback: show poster only, or retry
    // this.retryLoad();
  }

  getBestCustomerReviews(){
    this.crud.get("best-customer-reviews","2").subscribe((res:any)=>{
      this.best_customer_reviews  = res.data
      console.log(res);
    })
  }
  change(){
    this.route.navigate(['login'])
  }

  animationFirstSectionContent(){
    if (this.animating) return;
    const el = this.contentElem?.nativeElement;
    if (!el) return;

    this.animating = true;
    el.classList.add('anim-out');

    setTimeout(() => {
      this.idx = (this.idx + 1) % this.contents.length;
      this.currentContent = this.sanitizer.bypassSecurityTrustHtml(this.contents[this.idx]);
      el.classList.remove('anim-out');
      setTimeout(() => {
        this.animating = false;
      }, this.FADE_DURATION);
    }, this.FADE_DURATION);
  }

  changeTab(page:any){
    this.selected_tab = this.categories[page].id
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }


}
