import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrdersComponent } from './manage-orders.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzModalModule } from 'ng-zorro-antd/modal';

describe('ManageOrdersComponent', () => {
  let component: ManageOrdersComponent;
  let fixture: ComponentFixture<ManageOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzBackTopModule,NzTabsModule, NzModalModule],
      declarations: [ ManageOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
