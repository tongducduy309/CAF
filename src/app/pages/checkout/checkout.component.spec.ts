import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { of } from 'rxjs';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let crudService: any;
  const mockCrudService = jasmine.createSpyObj('CrudService', ['get']);
  const mockMainService = jasmine.createSpyObj('MainService', ['createNotification','formatPrice']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzRadioModule,NzGridModule,FormsModule,NzInputModule],
      declarations: [ CheckoutComponent ],
      providers:[{ provide:CrudService, useValue: mockCrudService },{ provide: MainService, useValue: mockMainService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    crudService = TestBed.inject(CrudService);
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('test01', () => {
    const discount = 10;
    const voucherCode = 'VOUCHER123';
    mockCrudService.get.and.returnValue(of({ result: 'success', data: { discount:discount } }));
    // component.bill={}
    component.code_gift = voucherCode.trim();
    component.verifyCode();

    expect(mockCrudService.get).toHaveBeenCalledWith('voucher', voucherCode);
    // expect(component.bill.discount).toBe(discount);
    // expect(component.bill.cost).toBeLessThan(component.bill.subtotal + component.bill.delivery_fee);
    expect(mockMainService.createNotification).toHaveBeenCalledWith('success', `Đang sử dụng mã giảm giá ${discount}%`);
  });

  it('test02', () => {
    const invalidCode = 'INVALIDCODE';
    mockCrudService.get.and.returnValue(of({ result: 'Not Exist' }));
    // component.bill={}

    component.code_gift = invalidCode.trim();
    component.verifyCode();

    expect(mockCrudService.get).toHaveBeenCalledWith('voucher', invalidCode);
    // expect(component.bill.discount).toBe(0);
    // expect(component.bill.cost).toBe(component.bill.subtotal + component.bill.delivery_fee);
    expect(mockMainService.createNotification).toHaveBeenCalledWith('info', 'Mã giảm giá không tồn tại hoặc đã hết hạn');
  });

  it('test03', () => {


    component.code_gift = '';
    // mockCrudService.get.and.returnValue();
    component.verifyCode();

    expect(component.bill.discount).toBe(0);
  });
});
