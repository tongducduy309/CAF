import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.scss']
})
export class ManageAddressComponent {
 @Input() visible = false
 @Input() choosing = 0
 @Output() visibleChange = new EventEmitter<boolean>();
 @Output() chooseEmitter = new EventEmitter();
 isFormAddress = false
 @Input() list_address = [
  {id:1,name:'Tống Đức Duy', contactNumber:'0586152003', address:'123', default:true, index:0},
  {id:1,name:'Tống Đức Duy', contactNumber:'0586152003', address:'123', index:1, choosing:true}
 ]
 addModifying = -1

 addressForm:any = {}

 submitFormAddress(){
  this.isFormAddress = false
  this.list_address[this.addModifying] = this.addressForm
 }

 close(){
  // visible=false
  this.visibleChange.emit(false)
 }

 removeAddress(id:any){
  this.list_address = this.list_address.filter((a:any)=>a.id!=id)
 }

 modifyAddress(a:any){
  console.log(a);
  this.addModifying = a.index
  this.addressForm = {...a}
  this.isFormAddress = true
 }

 chooseAddress(a:any){
  this.chooseEmitter.emit(a)

 }
}
