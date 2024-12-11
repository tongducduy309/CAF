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
  list_address:any = [
    {id:1,name:'Tống Đức Duy', contactnumber:'0586152003', address:'123', default_:true, index:0},
    {id:1,name:'Tống Đức Duy', contactnumber:'0586152003', address:'123', index:1, choosing:true}
  ]
  @Input() user:any

  addModifying = -1

  addressForm:any = {receiver:'',contactnumber:'',address:'',default_:false}

  isModify = false

  isaddressForm_default = false

  constructor (private crud:CrudService,private main:MainService){

  }
  ngAfterViewInit(): void {
    this.getAddressOfUser()
  }
  ngOnInit(): void {

  }





 async submitFormAddress(){

  if (!this.isValid(this.addressForm.receiver)||!this.isValid(this.addressForm.address)){
    this.main.createNotification("info","Vui lòng điền đầy đủ thông tin")
    return
  }
  if (this.addressForm.contactnumber.length<10||this.addressForm.contactnumber.length>11){
    this.main.createNotification("info","Số điện thoại không hợp lệ")
    return
  }
  if (this.isModify)
  {
    // console.log(this.list_address[this.addModifying],this.addressForm);
    if (this.main.equalObject({receiver:this.list_address[this.addModifying].receiver,address:this.list_address[this.addModifying].address,contactnumber:this.list_address[this.addModifying].contactnumber},{receiver:this.addressForm.receiver,address:this.addressForm.address,contactnumber:this.addressForm.contactnumber})){

    }
    else{
      this.crud.put("address-of-user",{...this.addressForm,uid:this.user.id}).then(response => response.json())
    .then((data:any) => {
      console.log(data);
        if (data.result=='success') {
          this.main.createNotification("success","Thay đổi địa chỉ thành công")
          console.log(this.addressForm);
          this.list_address[this.addModifying].receiver = this.addressForm.receiver
          this.list_address[this.addModifying].address = this.addressForm.address
          this.list_address[this.addModifying].contactnumber = this.addressForm.contactnumber

          console.log(this.list_address);
        }
        else{
          this.main.createNotification("error","Thay đổi địa chỉ không thành công")
        }
    })
    .catch(error => {
        console.error('Error:', error);
        this.main.createNotification("error","Thay đổi địa chỉ không thành công")
    });

    }

    if (this.addressForm.default_&&!this.list_address[this.addModifying].default_){
      this.crud.put("address-of-user/default",{uid:this.user.id,id:this.addressForm.id}).then(response => response.json())
    .then((data:any) => {
      console.log(data);
        if (data.result=='success') {
          this.main.createNotification("success","Đã thay đổi địa chỉ mặc định")
          // if (this.index_address_default==-1){

          //   for (let a of this.list_address){
          //     this.index_address_default++
          //     if (a.default_){

          //       break
          //     }

          //   }
          // }
          // console.log(this.list_address[this.index_address_default],this.index_address_default);
          this.list_address[0].default_=false

          this.list_address[this.addModifying].default_ = true

          const temp = {...this.list_address[0]}
          this.list_address[0]={...this.list_address[this.addModifying]}
          this.list_address[this.addModifying] = temp

        }
        else{
          console.log('Failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    }
  }
  else{
    if (this.list_address.length==0){
      this.addressForm.default_ = true
    }

    await this.crud.addData("address-of-user",{...this.addressForm,uid:this.user.id}).then(response => response.json())
    .then((data:any) => {
      console.log(data.status);
        if (data.result=='success') {
          // console.log("Successful Add Address");
          this.main.createNotification("success","Thêm địa chỉ thành công")
          this.addressForm["id"] = data.data
          this.list_address.push(this.addressForm)
          this.chooseEmitter.emit(this.addressForm)
          console.log(this.addressForm.id);

        }
        else{
          this.main.createNotification("error","Thêm địa chỉ không thành công")

        }
    })
    .catch(error => {
        console.error('Error:', error);
        this.main.createNotification("error","Thêm địa chỉ không thành công")
    });


  }
  //
  this.isaddressForm_default = false
  this.isFormAddress = false
 }

 openFormAddAddress(){
  this.addressForm = {receiver:'',contactnumber:'',address:'',default:false}
  if (this.list_address.length==0){
    this.addressForm.default_ = true
    this.isaddressForm_default = true
  }
  this.isFormAddress=true
  this.isModify=false
 }

 close(){
  // visible=false
  this.visibleChange.emit(false)
 }

 removeAddress(id:any){
  // console.log(this.list_address,id);
  this.crud.delete("address-of-user",id).subscribe((res:any)=>{
    if (res.result=='success'){
      this.main.createNotification("success","Đã xóa một địa chỉ")
      this.list_address = this.list_address.filter((a:any)=>a.id!=id)
    }
    else{
      this.main.createNotification("info","Xóa địa chỉ thất bại")
    }
  })

 }

 modifyAddress(a:any,index:any){
  console.log(a);
  this.addModifying = index
  this.addressForm = {...a}
  this.isaddressForm_default = a.default_
  this.isFormAddress = true
  this.isModify=true

 }

 chooseAddress(a:any){
  this.chooseEmitter.emit(a)

 }

  getAddressOfUser(){
    if (this.user)
    {
      this.crud.get("address-of-user",`${this.user.id}`).subscribe((address:any)=>{
        console.log(address);
        if (address.result=='success'){
          this.list_address = address.data
          for (let a of this.list_address){
            if (a.default_){
              this.chooseEmitter.emit(a)
              break
            }
          }

        }

      })
    }
  }

  isValid(s:any){
    if (s.trim().length==0) return false
    return true
  }

  handleContactNumber(){
    this.addressForm.contactnumber = this.addressForm.contactnumber.replace(/\D/g, '');
  }
}
