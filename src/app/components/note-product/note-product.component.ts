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
  @Output() submitEmitter = new EventEmitter();
  ngOnInit(): void {
  }

  cancel(){
    this.visibleChange.emit(false)
  }

  submit(){
    this.submitEmitter.emit({note:this.product.note,quantity:this.product.quantity})
    this.visibleChange.emit(false)
  }

  changeQuantity(){
    this.product.quantity = this.product.quantity.replace(/\D/g, '');
    if(this.product.quantity<1) this.product.quantity=1
    if(this.product.quantity>99) this.product.quantity=99
  }

  removeQuantity(){
    if (this.product.quantity>1)
      this.product.quantity--;

  }

  addQuantity(){
    if (this.product.quantity<99)
      this.product.quantity++;


  }
}
