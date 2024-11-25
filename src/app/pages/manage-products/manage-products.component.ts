import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit{
  isFormAddProduct=true
  loading = false;

  product:any = {
    listsize:[],
    shelf_status:true,
    img:null
  }



  constructor(private messageService: NzMessageService, private crud:CrudService) {}
  ngOnInit(): void {
    this.addSize()
  }
  handleCancel(){

  }
  handleOk(){
    this.crud.addData('products',this.product).catch((res)=>{
      console.log(res);
    })
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
