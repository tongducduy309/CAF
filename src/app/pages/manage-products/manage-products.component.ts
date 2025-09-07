import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';

@Component({
    selector: 'app-manage-products',
    templateUrl: './manage-products.component.html',
    styleUrls: ['./manage-products.component.scss'],
    standalone: false
})
export class ManageProductsComponent implements OnInit{
  isFormAddProduct=false
  isFormFlashSales=false

  product:any = {
    listsize:[],
    shelf_status:true,
    img:null,
    cid:-1
  }

  fs_product:any = {}

  products:any = []

  product_on_shelf = 0
  product_off_shelf = 0

  categories:any = []

  formTitle = 'Thêm sản phẩm'

  @ViewChild('img_product_form', { static: false }) imgProduct!: ElementRef;



  constructor(private crud:CrudService, private http: HttpClient, public main:MainService, private i18n: NzI18nService) {}
  async ngOnInit(): Promise<void> {
    const custom = vi_VN
    custom.DatePicker.lang.rangePlaceholder = ['Thời gian bắt đầu','Thời gian kết thúc']
    this.i18n.setLocale(custom);
    this.getAllProducts()
    this.getCategories()
  }
  getCategories(){

    this.crud.get("categories","all").subscribe((res:any)=>{
      this.categories = res.data
    })
  }

  getAllProducts(){
    this.crud.get("products","all").subscribe((res:any)=>{
      const products = res.data
      for (let p of products){
        if (p.shelf_status){
          this.product_on_shelf++
        }
        else {
          this.product_off_shelf++
        }
      }
      this.products=products
      // this.products_v={...this.products}
      // this.loaded()
      console.log(products);
    })
  }
  handleCancel(){
    this.isFormAddProduct=false
  }
  handleOk(){
      const imageBlob = this.imgProduct.nativeElement.files[0];
      const file = new FormData();
      file.set('img', imageBlob);
      file.set('name',this.product.name)
      file.set('listsize',JSON.stringify(this.product.listsize))
      file.set('cid',this.product.cid)
      file.set('description',this.product.description)
      file.set('shelf_status',this.product.shelf_status)
      this.http.post('https://api-caf.vercel.app/api/post/products', file).subscribe((response:any)=>{
        console.log(response);
        if (response.result=='success'){
          this.main.createNotification("success","Thêm sản phẩm thành công")
          this.isFormAddProduct=false
        }
        else{
          this.main.createNotification("error","Thêm sản phẩm không thành công")
        }

      });
  }

  openFormAddProduct(){
    this.formTitle = 'Thêm sản phẩm'
    this.product = {
      listsize:[],
      shelf_status:true,
      img:null,
      cid:-1,
      name:'',
      description:'',
    }
    this.isFormAddProduct=true
    this.addSize()
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    this.getBase64(info.file!.originFileObj!, (img: string) => {

      this.product.img = img;
    });
  }

  addSize(){

    // const id = this.product.listsize.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      size:'',
      cost: ''
    };
    this.product.listsize.push(control);
  }

  removeSize(index:any){
    this.product.listsize.splice(index,1)
  }

  chooseImg(){
    this.imgProduct.nativeElement.click()
  }

  changeImg(event:any){
    this.getBase64(event.target.files[0], (img: string) => {

      this.product.img = img;
    });
  }

  modifyProduct(index:any){
    this.formTitle = 'Sửa sản phẩm'
    this.product = this.products[index]
    this.product["listsize"]=[]
    for (let i=0;i<this.product.size.length;i++){
      this.product.listsize.push({size:this.product.size[i],cost:this.product.cost[i]})
    }
    this.isFormAddProduct=true
  }

  confirmDelete(name_id:any,img:any){
    this.crud.delete("products",`${name_id}/${img.replaceAll("/","$$$").replaceAll("?","@@")}`).subscribe((res:any)=>{
      console.log(res);
      if(res.result=='success'){
        this.main.createNotification("success","Xóa sản phẩm thành công")
      }
      else{
        this.main.createNotification("error","Xóa sản phẩm không thành công")
      }
    })
  }

  closeFormFlashSales(){
    this.isFormFlashSales=false
  }

  openFromFlashSales(index:any){
    this.isFormFlashSales=true
    const p = this.products[index]

    this.fs_product = {
      img:p.img,
      name:p.name,
      c_name:p.c_name,
      listsize:[]
    }

    for (let i=0;i<p.size.length;i++){
      console.log(p.datesale_from[i]);
      this.fs_product.listsize.push({id:p.id[i],size:p.size[i],cost:p.cost[i],sale:p.sale[i],datesale:[this.formatDate(p.datesale_from[i]),this.formatDate(p.datesale_to[i])]})
    }

    console.log(this.fs_product.listsize);
  }

  // rangePickerValue: [Date, Date] = [new Date('2023-11-22 10:23:10'), new Date('2023-11-30')];

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

  removeContentSale(index:any){
    this.fs_product.listsize[index].sale=''
    this.fs_product.listsize[index].datesale=[null,null]
    // this.fs_product.listsize[index].datasale_to=''
  }

  submitFlashSales(){
    let list = []
    for (let l of this.fs_product.listsize){
      if (l.sale&&(!l.datesale_from||!l.datesale_to)){
        this.main.createNotification("info",`Vui lòng điền thời gian bắt đầu và thời gian kết thúc khuyến mãi của kích cỡ ${l.size}`)
        return;
      }
      if (!l.sale&&(l.datesale_from&&l.datesale_to)){
        this.main.createNotification("info",`Vui lòng điền phần trăm giảm của kích cỡ ${l.size}`)
        return;
      }
      if (l.sale&&l.datesale_from&&l.datesale_to){
        list.push({pid:l.id,sale:l.sale,datesale_from:l.datesale_from,datesale_to:l.datesale_to})
      }
    }

    this.crud.addData('flash-sales',{list:list}).then(res=>res.json()).then((data)=>{
      console.log(data);
      if (data.result=='success'){
        this.main.createNotification("success","Cài đặt khuyến mãi thành công")
      }else{
        this.main.createNotification("info","Cài đặt khuyến mãi thất bại")
      }
    })


  }

  onChangeDateFlashSales(date:Date[],index:any){
    // this.fs_product.listsize[index].datesale_from=new Date(date[0]).toISOString()
    // this.fs_product.listsize[index].datesale_to=new Date(date[1]).toISOString()
    this.fs_product.listsize[index].datesale=[this.formatDate(date[0]),this.formatDate(date[1])]
    console.log(date[0],date[1]);
  }


}
