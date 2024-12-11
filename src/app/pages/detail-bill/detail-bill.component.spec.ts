import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBillComponent } from './detail-bill.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { ShowFullInvoiceComponent } from 'src/app/components/show-full-invoice/show-full-invoice.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

describe('DetailBillComponent', () => {
  let component: DetailBillComponent;
  let fixture: ComponentFixture<DetailBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzBackTopModule,NzIconModule,NzBadgeModule],
      declarations: [ DetailBillComponent,ShowFullInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
