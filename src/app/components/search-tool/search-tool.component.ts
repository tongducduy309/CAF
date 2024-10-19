import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, map, throttleTime } from 'rxjs';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-search-tool',
  templateUrl: './search-tool.component.html',
  styleUrls: ['./search-tool.component.scss']
})
export class SearchToolComponent implements OnInit{
  private inputElement!: HTMLInputElement;
  results:any = []
  key: any

  constructor(private crud:CrudService){

  }
  ngOnInit(): void {
    this.changeKey()
  }


  changeKey(){
    this.inputElement = document.getElementById('input') as HTMLInputElement;
    fromEvent(this.inputElement, 'input')
  .pipe(
    throttleTime(500), // Tối đa 1 lần gọi trong 500ms
    map((event: any) => event.target.value)
  )
  .subscribe(value => {
    this.findProducts()
  });
  }

  findProducts(){
    if(this.key.trim().length>0){
      this.crud.get("products",this.key.trim().toLowerCase()).subscribe((products)=>{
        this.results = products
      })
    }
  }
}
