import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-box-address',
  templateUrl: './box-address.component.html',
  styleUrls: ['./box-address.component.scss']
})
export class BoxAddressComponent {
  @Input() info:any = {}
  @Output()  removeEmitter = new EventEmitter()
  @Output()  modifyEmitter = new EventEmitter()
  @Output()  chooseEmitter = new EventEmitter()
  @Input() isShowGroupBtn=false
  remove(){
    this.removeEmitter.emit(this.info.id)
  }

  modify(){
    this.modifyEmitter.emit(this.info)
  }

  choose(){
    this.chooseEmitter.emit(this.info)
  }
}
