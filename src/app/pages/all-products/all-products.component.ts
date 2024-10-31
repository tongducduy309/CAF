import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/classes/page';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent extends Page implements OnInit  {

  color_text = '#262626';

  products:any = []
  // products_v:any=[]
  categories:any = []
  constructor(private crud:CrudService, private router:Router, private route: ActivatedRoute) {
    super();
    this.must_load=2
    this.route.paramMap.subscribe(async (params) => {
      const key = params.get('key')||''
      if (key!=''){
        this.crud.get("all-products",key).subscribe((products)=>{
          this.products=products
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
    this.crud.get("products","all").subscribe((products)=>{
      this.products=products
      this.loaded()
      // console.log(this.products);
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
      })
      // this.categories=categories
      console.log(categories);
      this.loaded()
    })
  }

  selectedProvince = 'Alphabetically,A-Z';
  provinceData = [ 'Best seller','Alphabetically,A-Z','Alphabetically,Z-A',
    'Feartured','Price,low to high','Price,high to low','Date,old to new','Date,new to old'];
  expandIconPosition: 'start' | 'end' = 'start';
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


}
