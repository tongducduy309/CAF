import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit{
  isFormAddProduct=false
  loading = false;

  product:any = {
    listsize:[],
    shelf_status:true,
    img:null,
    cid:2
  }

  product_on_shelf = 0
  product_off_shelf = 0

  @ViewChild('img_product_form', { static: false })
  imgProduct!: ElementRef;



  constructor(private messageService: NzMessageService, private crud:CrudService, private http: HttpClient, private main:MainService) {}
  ngOnInit(): void {

    this.getAllProducts()
  }

  getAllProducts(){
    this.crud.get("products","all").subscribe((products:any)=>{
      for (let p of products){
        if (p.shelf_status){
          this.product_on_shelf++
        }
        else {
          this.product_off_shelf++
        }
      }
      // this.products=products
      // this.products_v={...this.products}
      // this.loaded()
      console.log(products);
    })
  }
  handleCancel(){
    this.isFormAddProduct=false
  }
  handleOk(){
    // this.crud.addData('products',this.product).then(response=>response.json()).then(data=>{
    //   console.log(data);
    // })
      const imageBlob = this.imgProduct.nativeElement.files[0];
      const file = new FormData();
      file.set('img', imageBlob);
      file.set('name',this.product.name)
      file.set('listsize',JSON.stringify(this.product.listsize))
      file.set('cid','2')
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
    this.product = {
      listsize:[],
      shelf_status:true,
      img:null,
      cid:2,
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
      this.loading = false;
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


}
