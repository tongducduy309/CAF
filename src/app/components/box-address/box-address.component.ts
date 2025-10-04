import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from 'src/app/models/address.model';

@Component({
    selector: 'app-box-address',
    templateUrl: './box-address.component.html',
    styleUrls: ['./box-address.component.scss'],
    standalone: false
})
export class BoxAddressComponent {
  @Input() info:Partial<Address> = {}
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
