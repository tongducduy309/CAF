import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.scss']
})
export class ManageAccountsComponent implements OnInit{

  accounts:any = []

  accounts_v:any = []

  loading_table=false

  status = '0'
  title:any=''

  isFormStaff=false

  account:any = {}

  processing=false
  constructor(private router:Router, private crud:CrudService, private main:MainService, private route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.title=params.get('title')
      this.getData()
    });
  }

  getData(){
    if (this.title=='accounts-customer')
      this.getCustomers()
    else
      this.getStaffs()
  }

  getCustomers(){
    this.crud.get("accounts","0").subscribe((res:any)=>{
      console.log(res);
      if(res.result=='success'){
        this.accounts=res.data
        this.accounts_v = [...this.accounts]

      }else{
        this.main.createNotification("error","Lấy dữ liệu thất bại")
      }
    })
  }
  getStaffs(){
    this.crud.get("accounts","1").subscribe((res:any)=>{
      if(res.result=='success'){
        this.accounts=res.data
        this.accounts_v = [...this.accounts]

      }else{
        this.main.createNotification("error","Lấy dữ liệu thất bại")
      }
    })
  }

  block_or_Unblock_Account(id:any,status:any){
    this.loading_table=true
    this.crud.put("account/status",{id:id,status:!status}).then(res=>res.json()).then(data=>{
      if(data.result='success'){
        if (status){
          this.main.createNotification("success","Tài khoản đã bị khóa")
        }
        else{
          this.main.createNotification("success","Tài khoản đã được mở khóa")
        }
        this.getData()
        status='0'
      }
      else{
        this.main.createNotification("info","Thao tác thất bại")
      }

      this.loading_table=false
    })
  }

  formatDateToString(s:any){
    if (s){
      const date = new Date(s);

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      return`${day}/${month}/${year}`
    }
    return null
  }

  changeStatus(){
    if (this.status=='0'){
      this.accounts_v = [...this.accounts]
    }
    else {
      this.accounts_v = this.accounts.filter((v:any)=>v.status==(this.status=='1'))
    }

  }

  isValid(s:string){
    if (s.trim().length==0) return false
    return true
  }

  isValidEmail(email:string){
    if (email.length==0) return false
    if (email.indexOf("@")==-1) return false
    return true
  }

  submit(){
    if (!this.account.fullname||!this.account.email){
      this.main.createNotification("info","Vui lòng điền đầy đủ thông tin")
      return;
    }

    if (!this.isValid(this.account.fullname)) {
      this.main.createNotification('info', 'Bắt buộc ghi đầy đủ họ và tên');
      return;
    }
    if (!this.isValidEmail(this.account.email)) {
      this.main.createNotification('info', 'Email không hợp lệ, email phải chưa "@" (Ví dụ: vidu@example.com)');
      return;
    }
    this.processing=true
    this.crud.addData("register",{fullname:this.account.fullname,email:this.account.email,password:'12345678',role:'1'}).then(res=>res.json()).then(data=>{
      if (data.result=='success'){

        this.main.createNotification("success","Đã tạo tài khoản nhân viên mới thành công")
        this.isFormStaff=false
      }
      else{
        if(data.result=='existed'){
          this.main.createNotification("info","Email đã tồn tại")
        }
        else{
          this.main.createNotification("error","Xảy ra lỗi")
        }
      }
      this.processing=false
    })
  }

  closeFormStaff(){
    this.isFormStaff=false
  }
  openFormStaff(){
    this.account = {}
    this.isFormStaff=true
  }
}
