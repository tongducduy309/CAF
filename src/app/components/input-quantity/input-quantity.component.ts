import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { fromEvent, debounceTime, map } from 'rxjs';

@Component({
  selector: 'input-quantity',
  templateUrl: './input-quantity.component.html',
  styleUrl: './input-quantity.component.scss',
  standalone: false
})
export class InputQuantityComponent implements AfterViewInit{
  
  @ViewChild('btnPlus') btnPlus!: ElementRef;
  @ViewChild('btnSub') btnSub!: ElementRef;
  @Input() quantity: number = 0;
  @Input() max:number = 99;
  @Input() min:number = 1;
  @Output() onChange = new EventEmitter<number>();
  @Input() theme:"dark"|"light" = 'light'

  ngAfterViewInit(): void {
    this.event()
  }

  changeQuantity() {
    this.quantity = parseInt(this.quantity.toString().replace(/\D/g, ''));
    if (this.quantity < 1)
      this.quantity = 1
    if (this.quantity > 99)
      this.quantity = 99
    this.onChange.emit(this.quantity)
  }

  subQuantity() {
    if (this.quantity > this.min) {
      this.quantity--;
    }
    
  }

  addQuantity() {

    if (this.quantity < this.max) {
      this.quantity++;
    }

  }
  event() {
    const plus = this.btnPlus.nativeElement as HTMLDivElement;
    const sub = this.btnSub.nativeElement as HTMLDivElement;

    fromEvent(plus, 'click')
      .pipe(
        debounceTime(300),
        map((event: any) => event.target)
      )
      .subscribe(value => {
        if (this.quantity <= this.max) {

          this.onChange.emit(this.quantity)
        }
      });

    fromEvent(sub, 'click')
      .pipe(
        debounceTime(300),
        map((event: any) => event.target)
      )
      .subscribe(value => {
        if (this.quantity >= this.min) {
          this.onChange.emit(this.quantity)
        }
      });
  }
}
