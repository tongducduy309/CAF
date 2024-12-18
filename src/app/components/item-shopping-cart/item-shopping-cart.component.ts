import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, map } from 'rxjs';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-item-shopping-cart',
  templateUrl: './item-shopping-cart.component.html',
  styleUrls: ['./item-shopping-cart.component.scss']
})
export class ItemShoppingCartComponent implements OnInit,AfterViewInit{

  @Input() item:any = {}
  @Output() QuantityEmitter = new EventEmitter()
  @Output() RemoveEmitter = new EventEmitter()

  @ViewChild('btnPlus') btnPlus!: ElementRef;
  @ViewChild('btnSub') btnSub!: ElementRef;

  constructor(private router:Router, public main:MainService, private crud:CrudService){

  }
  ngAfterViewInit(): void {

    // Promise.resolve().then(()=> {

    // })
    this.event()
  }

  ngOnInit(): void {
    // console.log(this.item);

  }

  remote(s:any){
    console.log(s);
    this.router.navigate([s])
  }

  remove(){
    this.RemoveEmitter.emit({id:this.item.id,quantity:this.item.quantity})
  }

  changeQuantity(){
    this.item.quantity = this.item.quantity.replace(/\D/g, '');
    if(this.item.quantity<1)
      this.item.quantity=1
    if(this.item.quantity>99)
      this.item.quantity=99
    this.QuantityEmitter.emit(this.item)
    this.updateQuantity()
  }

  subQuantity(){
    if (this.item.quantity>1)
    {
      this.item.quantity--;
      this.QuantityEmitter.emit(this.item)
    }

  }

  addQuantity(){

    if (this.item.quantity<99){
      this.item.quantity++;
      this.QuantityEmitter.emit(this.item)
    }


  }

  event(){
    const plus = this.btnPlus.nativeElement as HTMLDivElement;
    const sub = this.btnSub.nativeElement as HTMLDivElement;

    fromEvent(plus, 'click')
  .pipe(
    debounceTime(300),
    map((event: any) => event.target)
  )
  .subscribe(value => {
    if (this.item.quantity<=99){

      this.updateQuantity()
    }
  });

  fromEvent(sub, 'click')
  .pipe(
    debounceTime(300),
    map((event: any) => event.target)
  )
  .subscribe(value => {
    if (this.item.quantity>0){
      this.updateQuantity()
    }
  });
  }

  updateQuantity(){
    this.crud.put("cart",{id:this.item.id,quantity:this.item.quantity}).then(res=>res.json()).then(data=>{
      // if (data.result=='failed'){
      //   this.main.createNotification("error","[Lỗi] Thay đổi số lượng giỏ hàng")
      // }
    })
  }
}
