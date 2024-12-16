import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, map, throttleTime } from 'rxjs';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

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

  constructor(private crud:CrudService, private el: ElementRef, private main:MainService){

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
      this.crud.get("products",this.key.trim().toLowerCase()).subscribe((res:any)=>{
        if (res.result=='success'){
          this.results = res.data
        console.log("search",res.data);
        this.isFinding=false
        }
        else{
          this.main.createNotification("error","Lỗi tìm kiếm")
        }
      })
    }
    else {
      this.results = []
    }


  }
}
