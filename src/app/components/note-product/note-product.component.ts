import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-note-product',
  templateUrl: './note-product.component.html',
  styleUrls: ['./note-product.component.scss']
})
export class NoteProductComponent implements OnInit{

  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() title = 'Thêm vào giỏ'
  @Input() product:any
  @Output() productEmitter = new EventEmitter();
  ngOnInit(): void {
  }

  cancel(){
    this.visibleChange.emit(false)
  }

  submit(){
    this.productEmitter.emit({note:this.product.note,quantity:this.product.quantity})
    this.visibleChange.emit(false)
  }

  changeQuantity(){
    this.product.quantity = this.product.quantity.replace(/\D/g, '');
    if(this.product.quantity<1) this.product.quantity=1
  }

  removeQuantity(){
    if (this.product.quantity>1)
      this.product.quantity--;

  }

  addQuantity(){
    this.product.quantity++;

  }
}
