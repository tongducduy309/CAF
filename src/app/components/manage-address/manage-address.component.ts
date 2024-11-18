import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.scss']
})
export class ManageAddressComponent implements OnInit,AfterViewInit{
  @Input() visible = false
  @Input() choosing = 0
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() chooseEmitter = new EventEmitter();
  isFormAddress = false
  list_address = [
    {id:1,name:'Tống Đức Duy', contactnumber:'0586152003', address:'123', default:true, index:0},
    {id:1,name:'Tống Đức Duy', contactnumber:'0586152003', address:'123', index:1, choosing:true}
  ]
  @Input() user:any

  addModifying = -1

  addressForm:any = {receiver:'',contactnumber:'',address:'',default:false}

  isModify = false

  isaddressForm_default = false
  index_address_default:any = -1

  constructor (private crud:CrudService,private main:MainService){

  }
  ngAfterViewInit(): void {
    this.getAddressOfUser()
  }
  ngOnInit(): void {

  }



 async submitFormAddress(){
  this.isFormAddress = false
  if (this.isModify)
  {

    this.list_address[this.addModifying] = this.addressForm
    this.crud.put("address-of-user",this.addressForm).then(response => response.json())
    .then((data:any) => {
        if (data.result=='success') {
          this.main.createNotification("success","Thay đổi địa chỉ thành công")
        }
        else{
          this.main.createNotification("error","Thay đổi địa chỉ không thành công")
        }
    })
    .catch(error => {
        console.error('Error:', error);
        this.main.createNotification("error","Thay đổi địa chỉ không thành công")
    });
    if (this.addressForm.default){
      if (this.index_address_default==-1){

        for (let a of this.list_address){
          if (a.default){

            break
          }
          this.index_address_default++
        }
      }
      this.list_address[this.index_address_default].default=false
      this.index_address_default = this.addModifying
    }
  }
  else{
    if (this.list_address.length==0){
      this.addressForm.default = true
      this.index_address_default = 0
    }

    await this.crud.addData("address-of-user",{...this.addressForm,uid:this.user.id}).then(response => response.json())
    .then((data:any) => {
      console.log(data.status);
        if (data.result=='success') {
          console.log("Successful Add Address");
          this.main.createNotification("success","Thêm địa chỉ thành công")
          this.addressForm["id"] = data.rows

        }
        else{
          this.main.createNotification("error","Thêm địa chỉ không thành công")
        }
    })
    .catch(error => {
        console.error('Error:', error);
        this.main.createNotification("error","Thêm địa chỉ không thành công")
    });
    this.list_address.push(this.addressForm)
    this.chooseEmitter.emit(this.addressForm)
    console.log(this.addressForm.id);

  }
  this.addressForm = {receiver:'',contactnumber:'',address:'',default:false}
  this.isaddressForm_default = false
 }

 close(){
  // visible=false
  this.visibleChange.emit(false)
 }

 removeAddress(id:any){
  // console.log(this.list_address,id);
  this.crud.delete("address-of-user",id).subscribe(result=>{
    if (result=='success'){
      this.main.createNotification("success","Đã xóa một địa chỉ")
    }
    else{
      this.main.createNotification("info","Xóa địa chỉ thất bại")
    }
  })
  this.list_address = this.list_address.filter((a:any)=>a.id!=id)
 }

 modifyAddress(a:any){
  console.log(a);
  this.addModifying = a.index
  this.addressForm = {...a}
  this.isaddressForm_default = a.default
  this.isFormAddress = true
  this.isModify=true

 }

 chooseAddress(a:any){
  this.chooseEmitter.emit(a)

 }

 getAddressOfUser(){
  this.crud.get("address-of-user",this.user.id).subscribe((address:any)=>{
    console.log(address);
    if (address.result=='success'){
      this.list_address = address.rows
      for (let a of this.list_address){
        if (a.default){
          this.chooseEmitter.emit(a)
          break
        }
      }

    }

  })
}
}
