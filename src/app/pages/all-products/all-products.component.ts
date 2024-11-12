import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/classes/page';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent extends Page implements OnInit  {

  color_text = '#262626';

  filters_value:any = {
    price:[false,false,false,false],
    trend:[false,false],
    category:[]
  }
  filters:any={
    category:[],
    price:[],
    trend:[]
  }
  n_filters = 0

  products:any = []
  products_v:any=[]
  categories:any = []
  constructor(private crud:CrudService, private router:Router, private route: ActivatedRoute, private main:MainService) {
    super();
    this.must_load=2
    this.route.paramMap.subscribe(async (params) => {
      const key = params.get('key')||''
      if (key!=''){
        this.crud.get("all-products",key).subscribe((products:any)=>{
          this.products=products
          this.products_v=[...products]
          this.loaded()
          console.log(this.products);
        })
      }
      else{
        this.getAllProducts();
      }
    });
  }

  ngOnInit(): void {


    this.getCategories();
  }

  getAllProducts(){
    this.crud.get("products","all").subscribe((products:any)=>{
      this.products=products
      this.products_v=[...products]
      this.loaded()
      console.log(this.products);
    })
  }

  getCategories(){

    this.crud.get("categories","group-by-type").subscribe((categories:any)=>{
      // this.categories.drinks = categories.filter((category:any)=>category.type==0)
      // this.categories.food = categories.filter((category:any)=>category.type==1)
      this.categories = []
      Object.keys(categories).forEach((key:any)=>{
        this.categories.push({
          name:key,
          values:categories[key]
        })
        this.filters_value.category.push(false)
      })
      // this.categories=categories
      // console.log(categories);
      this.loaded()
    })
  }

  selectedSort = '0';
  panels = [
    {
      active: true,
      name: 'Availability',
    },
    {
      active: true,
      name: 'Price'
    },
    {
      active: true,
      name: 'Product type'
    },
    {
      active: true,
      name: 'Brand'
    },
    {
      active: true,
      name: 'Color'
    },
    {
      active: true,
      name: 'Material'
    },
    {
      active: true,
      name: 'Size'
    },
    {
      active: true,
      name: 'Style'
    },
  ];

  log(values: string[]): void {
    console.log(values);
  }

  changePrice(price:any){

  }

  remote(path:string){
    console.log(path);
    this.router.navigate([path])
  }

  changeItemFilters(value:any,state:any){
    const s =  value.split("_")
    // console.log(s);
    if (state){

      this.filters[s[0]].push(value)
      this.n_filters++
    }
    else
    {
      this.n_filters--
    this.filters[s[0]].splice(this.filters[s[0]].indexOf(value),1)
    }

    if (this.n_filters>0){
      let products = [...this.products]
      if(this.filters.category.length>0){
        let fil_category:number[] = []
        for (let c of this.filters.category) fil_category.push(parseInt(c.split("_")[2]))
        products  = products.filter((p:any)=>fil_category.indexOf(p.cid)>-1)
      }
      if (this.filters.price.length>0){
        let max_price=0,min_price=9999999999
        for (let p of this.filters.price){
          let mi = parseInt(p.split("_")[2]),ma = parseInt(p.split("_")[3])
          if (mi<min_price) min_price=mi
          if (ma>max_price) max_price=ma
        }
        let i=0;
        while (i<products.length){
          const price  = this.main.getPrice({cost:products[i].cost[0],sale:products[i].sale[0]})
          if (price<min_price||price>=max_price) products.splice(i,1)
          else i++
        }
      }

      this.products_v = products

    }
    else{
      this.products_v = [...this.products]
    }
    // if (state){
    //   this.filters[key] = [value]
    // }
  }

  removeFilters(){
    for (let f of this.filters.category){
      let s= f.split("_")
      this.filters_value.category[parseInt(s[1])]=false
    }

    for (let f of this.filters.price){
      let s= f.split("_")
      this.filters_value.price[parseInt(s[1])]=false
    }

    for (let f of this.filters.trend){
      let s= f.split("_")
      this.filters_value.trend[parseInt(s[1])]=false
    }
    this.filters = {
      price:[],
      category:[],
      trend:[]
    }
    this.products_v=[...this.products]
    this.n_filters = 0
  }

  sortBy(){
    this.products_v = [...this.products]
    switch(this.selectedSort){

      case '1':
        // this.products_v.sort((a,b)=>a.)
        break
    }
  }


}
