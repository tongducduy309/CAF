import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { SearchToolComponent } from '../search-tool/search-tool.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { FormsModule } from '@angular/forms';
import { MainService } from 'src/services/main.service';
import { CrudService } from 'src/services/crud.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {

  const mockMainService = jasmine.createSpyObj('MainService', ['createNotification','getPrice']);
  const mockCrudService = jasmine.createSpyObj('CrudService', ['get','delete']);
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let crudService:any
  let router:any
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzSpinModule,NzDrawerModule,FormsModule],
      declarations: [ HeaderComponent,SearchToolComponent ],
      providers:[
        { provide: MainService, useValue: mockMainService },
        { provide: CrudService, useValue: mockCrudService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    crudService = TestBed.inject(CrudService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('test01', () => {
    component.user=null
    component.open()
    expect(mockMainService.createNotification).toHaveBeenCalledWith('info', 'Đăng nhập để mở giỏ hàng');
  });

  it('test02', () => {
    component.user={id:13,role:0}
    mockCrudService.get.and.returnValue(of({data:[]}));
    component.open()
    expect(component.visibleCart).toBeTrue();
    expect(mockCrudService.get).toHaveBeenCalledWith("cart", component.user.id);

  });

  it('test03', () => {
    component.itemsCart=[{id:1,quantity:1},{id:3,quantity:3}]
    mockMainService.getPrice.and.returnValue(1);
    component.changeQuantityItemInCart({id:1,quantity:4})
    expect(component.itemsCart[0].quantity).toEqual(4)
    expect(component.total).toEqual(7)
    expect(component.subtotal).toEqual(7)
  });

  it('test04', () => {
    component.itemsCart=[{id:1,quantity:1},{id:3,quantity:3}]
    component.total=4
    mockMainService.getPrice.and.returnValue(1);
    mockCrudService.delete.and.returnValue(of({result:"success"}))
    component.removeItemInCart({id:1,quantity:1})
    expect(component.itemsCart.indexOf({id:1,quantity:1})).toEqual(-1)
    expect(component.total).toEqual(3)
  });

  it('test05', () => {
    component.itemsCart=[{id:1,quantity:1},{id:3,quantity:3}]
    component.total=4
    mockMainService.getPrice.and.returnValue(1);
    mockCrudService.delete.and.returnValue(of({result:"failed"}))
    component.removeItemInCart({id:1,quantity:1})
    expect(mockMainService.createNotification).toHaveBeenCalledWith("error","Xóa sản phẩm khỏi giỏ hàng không thành công");
  });
});
