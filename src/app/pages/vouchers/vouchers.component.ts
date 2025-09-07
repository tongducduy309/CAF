import { Component, OnInit } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
    selector: 'app-vouchers',
    templateUrl: './vouchers.component.html',
    styleUrls: ['./vouchers.component.scss'],
    standalone: false
})
export class VouchersComponent implements OnInit{
  vouchers_v:any = []
  vouchers:any = []
  voucher:any = {
  }

  date_status = '0'

  isFormVoucher=false
  loading = true

  constructor(private i18n: NzI18nService, private main:MainService, private crud:CrudService){
    const custom = vi_VN
    custom.DatePicker.lang.rangePlaceholder = ['Thời gian bắt đầu','Thời gian kết thúc']
    this.i18n.setLocale(custom);
  }
  ngOnInit(): void {
    this.getVouchers()
  }

  getVouchers(){
    this.crud.get("vouchers",'all').subscribe((res:any)=>{
      if (res.result=='success'){
        this.vouchers=res.data
        this.vouchers_v = [...this.vouchers]
        this.loading=false
      }
    })
  }

  formatDate(isoString:any) {
    if (isoString){
      const date = new Date(isoString);

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return new Date(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    }
    return null


  }

  formatDateToString(s:any){
    if (s){
      const date = new Date(s);

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    }
    return null
  }

  modify(index:any){

  }
  confirmDelete(id:any){
    this.crud.delete("voucher",id).subscribe((res:any)=>{
      if (res.result=='success'){
        this.vouchers = this.vouchers.filter((v:any)=>v.id!=id)
        this.vouchers_v = [...this.vouchers]
        this.date_status = '0'
        this.main.createNotification("success","Xóa thành công")
      }
      else{
        this.main.createNotification("info","Xóa không thành công")
      }
    })

  }

  closeFormVoucher(){
    this.isFormVoucher=false
  }

  openFormVoucher(){
    this.isFormVoucher=true
    this.voucher = {}
  }
  submitVoucher(){
    if (!this.checkCode()) return;

    for (let v of this.vouchers){
      if (v.code==this.voucher.code){
        this.main.createNotification("info","Mã giảm giá này đã tồn tại")
        return
      }
    }
    if (this.voucher.discount<1||this.voucher.discount>100){
      this.main.createNotification("info","Phần trăm giảm không hợp lệ chỉ trong khoảng 0-100%")
      return
    }
    this.changeQuantity()
    this.crud.addData('voucher',{...this.voucher}).then(res=>res.json()).then((data)=>{
      if (data.result=='success'){
        this.main.createNotification("success","Thêm phiếu khuyến mãi thành công")
        this.vouchers = [...this.vouchers,{...this.voucher,id:data.data,date_from:this.voucher.date[0],date_to:this.voucher.date[1]}]
        this.vouchers_v = [...this.vouchers]
        this.date_status= '0'
      }else{
        this.main.createNotification("info","Thêm phiếu khuyến mãi thất bại")
      }
    })

    this.isFormVoucher=false

  }

  checkCode(){
    if (!this.voucher.code) return false
    const code = this.voucher.code
    if (code.trim().length<6||code.trim().length>255){
      this.main.createNotification("info","Mã giảm giá có độ dài ít nhất bằng 6 và tối đa 255 kí tự")
      return false
    }

    return true
  }

  changeQuantity(){
    if (!this.voucher.quantity) return
    this.voucher.quantity = this.voucher.quantity.replace(/\D/g, '');
    if(this.voucher.quantity<1) this.voucher.quantity=1
    if(this.voucher.quantity>999999999) this.voucher.quantity=999999999
  }

  changeDiscount(){
    if (!this.voucher.discount) return
    this.voucher.discount = this.voucher.discount.replace(/\D/g, '');
  }

  onChangeDate(date:Date[]){
    this.voucher.date=[this.formatDate(date[0]),this.formatDate(date[1])]
    // console.log(this.voucher.date[0],this.voucher.date[1]);
  }

  changeDateStatus(){
    if (this.date_status=='0'){
      this.vouchers_v = [...this.vouchers]
    }
    else {
      this.vouchers_v = this.vouchers.filter((v:any)=>v.date_status==(this.date_status=='1'))
    }

  }
}
