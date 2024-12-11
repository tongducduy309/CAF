import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAddressComponent } from './manage-address.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { BoxAddressComponent } from '../box-address/box-address.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

describe('ManageAddressComponent', () => {
  let component: ManageAddressComponent;
  let fixture: ComponentFixture<ManageAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzDrawerModule, NzModalModule, NzBadgeModule],
      declarations: [ ManageAddressComponent,BoxAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
