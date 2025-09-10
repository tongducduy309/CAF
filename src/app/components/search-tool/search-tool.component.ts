import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, map, throttleTime } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
    selector: 'app-search-tool',
    templateUrl: './search-tool.component.html',
    styleUrls: ['./search-tool.component.scss'],
    standalone: false
})
export class SearchToolComponent implements OnInit{
  @Input() theme = 'light'
  @Output() closeEmitter = new EventEmitter();
  private inputElement!: HTMLInputElement;
  results:any = []
  key: any
  isFinding = false

  constructor(private crud:CrudService, private el: ElementRef, private main:MainService, private productService:ProductService) {

  }
  ngOnInit(): void {
    
    this.changeKey()
  }


  changeKey(){

    this.inputElement = this.el.nativeElement.querySelector('.input_search') as HTMLInputElement;

    fromEvent(this.inputElement, 'input')
  .pipe(
    debounceTime(300),
    map((event: any) => event.target.value)
  )
  .subscribe(value => {
    this.isFinding = true
    this.findProducts()
  });
  }

  findProducts(){
    if(this.key.trim().length>0){
      this.productService.searchProduct(this.key.trim()).then((res:Product)=>{
        this.results = res;
        this.isFinding=false
        
        // else{
        //   this.main.createNotification("error","Lỗi tìm kiếm")
        // }
      })
    }
    else {
      this.results = []
    }


  }

  close(){
    this.key = ''
    this.results = []
    this.isFinding = false
    this.closeEmitter.emit()
  }
}
