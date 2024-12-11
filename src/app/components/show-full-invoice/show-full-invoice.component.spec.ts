import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFullInvoiceComponent } from './show-full-invoice.component';
import { MainService } from 'src/services/main.service';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

describe('ShowFullInvoiceComponent', () => {
  let component: ShowFullInvoiceComponent;
  let fixture: ComponentFixture<ShowFullInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzIconModule,NzBadgeModule],
      declarations: [ ShowFullInvoiceComponent ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFullInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
