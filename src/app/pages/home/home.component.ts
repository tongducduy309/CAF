import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Page } from 'src/app/classes/page';
import { LangService } from 'src/app/services/lang.service';
import { PageTitleService } from 'src/app/services/page-title.service';
import { CrudService } from 'src/services/crud.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent extends Page implements OnInit{
  title_button= "Login"
  list_product = [
    {
      img:'https://tulieuvankien.dangcongsan.vn/Uploads/2018/7/5/4/united_kingdom.jpg',
      name:'Tên Sản Phẩm 1',
      price:'10.000'
    }
  ]
  namepush = ''

  products_best_discount: any = []

  products_by_cate: any = {}

  selected_tab = 2

  categories:any = []

  best_customer_reviews:any = []

  private lang = inject(LangService);

  private pageTitle = inject(PageTitleService);

  constructor (private crud:CrudService, private route:Router, private elRef: ElementRef){
    super()
  }
  ngOnInit(): void {
    this.pageTitle.setTitle('HOME.TITLE');
    this.animationFirstSectionContent();
    this.getAllProducts();
    // this.getCategories();
    this.getBestCustomerReviews();
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
      this.loaded()
    });

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
    const contents = [
      'Cà phê đậm vị',
    'Trái cây nguyên chất',
    'Thơm mát <b>ngọt vị.</b>'
    ]
    const content = this.elRef.nativeElement.querySelector('.banner-center-content .content')
    let i=0
    setInterval(()=>{
      if(content){
        content.innerHTML = contents[i++]
        if (i==3) i=0
      }
    },2000)
  }

  changeTab(page:any){
    this.selected_tab = this.categories[page].id
  }


}
