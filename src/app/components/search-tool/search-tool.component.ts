import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, map, throttleTime } from 'rxjs';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-search-tool',
  templateUrl: './search-tool.component.html',
  styleUrls: ['./search-tool.component.scss']
})
export class SearchToolComponent implements OnInit{
  @Input() theme = 'light'
  private inputElement!: HTMLInputElement;
  results:any = []
  key: any
  isFinding = false

  constructor(private crud:CrudService, private el: ElementRef){

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
      console.log(this.key.trim().toLowerCase());
      this.crud.get("products",this.key.trim().toLowerCase()).subscribe((products)=>{
        this.results = products
        // console.log(products);
        this.isFinding=false
      })
    }
    else {
      this.results = []
    }


  }
}
