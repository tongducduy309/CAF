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

  products:any = {}
  products_v:any={}
  name_cate_products:any = []
  filter_name_cate_products:any = []
  categories:any = []


  constructor(private crud:CrudService, private router:Router, private route: ActivatedRoute, private main:MainService) {
    super();
    this.must_load=2
    this.route.paramMap.subscribe(async (params) => {
      const key = params.get('key')||''
      if (key!=''){
        this.crud.get("all-products",key).subscribe((res:any)=>{
          this.products=res.data
          this.products_v=[...this.products]
          this.loaded()
          // console.log(this.products);
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
    this.crud.get("products","all").subscribe((res:any)=>{
      for (let p of res.data){
        if (!(p.cid in this.products)){
          this.products[p.cid] = [p]
          this.name_cate_products.push({name:p.c_name,id:p.cid})
        }
        else {
          this.products[p.cid].push(p)
        }
      }
      // this.products=products
      this.products_v={...this.products}
      this.loaded()
      // console.log(this.products);
    })
  }

  getCategories(){

    this.crud.get("categories","group-by-type").subscribe((res:any)=>{
      // this.categories.drinks = categories.filter((category:any)=>category.type==0)
      // this.categories.food = categories.filter((category:any)=>category.type==1)
      this.categories = []
      Object.keys(res.data).forEach((key:any)=>{
        this.categories.push({
          name:key,
          values:res.data[key]
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

  isOver30DaysOld(time:any): boolean {
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const thirtyDaysInMilliseconds = 30 * millisecondsInDay;

    const currentTime = Date.now();
    const timeDifference = currentTime - time;

    return timeDifference > thirtyDaysInMilliseconds;
  }

  changeItemFilters(value:any,state:any){
    // console.log(this.name_cate_products);
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
      var pts = {...this.products}
      for (let f of this.filter_name_cate_products){
        this.name_cate_products.push(f)
      }
      this.filter_name_cate_products = []
      if(this.filters.category.length>0){
        let fil_category:number[] = []
        for (let c of this.filters.category) fil_category.push(parseInt(c.split("_")[2]))
        let i = 0
        while (i<this.name_cate_products.length){
          let n = this.name_cate_products[i]
          if (!fil_category.includes(n.id)){
            this.filter_name_cate_products.push(n)
            delete pts[n.id]
            this.name_cate_products.splice(i,1)

          }
          else i++
        }

      }
      if (this.filters.price.length>0){
        let max_price=0,min_price=9999999999
        for (let p of this.filters.price){
          let mi = parseInt(p.split("_")[2]),ma = parseInt(p.split("_")[3])
          if (mi<min_price) min_price=mi
          if (ma>max_price) max_price=ma
        }
        let i = 0
        while (i<this.name_cate_products.length){
          let n = this.name_cate_products[i]
          let u=0,a=[...pts[n.id]]
          while (u<a.length){
            let price  = this.main.getPrice({cost:a[u].cost[0],sale:a[u].sale[0]})
            if (price<min_price||price>=max_price) {
              a.splice(u,1)
            }
            else
              u++
          }
          pts[n.id] = [...a]
          if (pts[n.id].length==0){
            this.filter_name_cate_products.push(n)
            delete pts[n.id]
            this.name_cate_products.splice(i,1)

          }
          else i++
        }

      }

      if (this.filters.trend.length>0){
        let i = 0
        while (i<this.name_cate_products.length){
          let n = this.name_cate_products[i]
          let u=0,a=[...pts[n.id]]
          while (u<a.length){
            const date = new Date(pts[n.id][u].created);
            const timestamp = date.getTime();
            if (this.isOver30DaysOld(timestamp)) {
              a.splice(u,1)
            }
            else
              u++
          }
          pts[n.id] = [...a]
          if (pts[n.id].length==0){
            this.filter_name_cate_products.push(n)
            delete pts[n.id]
            this.name_cate_products.splice(i,1)

          }
          else i++
        }
      }

      this.products_v = {...pts}
      console.log(this.products);

    }
    else{
      this.products_v = {...this.products}

      for (let f of this.filter_name_cate_products){
        this.name_cate_products.push(f)
      }
      console.log(this.products);
      console.log(this.name_cate_products);
      this.filter_name_cate_products = []
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
    this.products_v = {...this.products}
      for (let f of this.filter_name_cate_products){
        this.name_cate_products.push(f)
      }
      this.filter_name_cate_products = []
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

  AddToCart(product:any){
    this.addToCart(product)
  }


}
