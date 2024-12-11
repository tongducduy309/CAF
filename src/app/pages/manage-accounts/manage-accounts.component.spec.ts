import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountsComponent } from './manage-accounts.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { FormsModule } from '@angular/forms';

describe('ManageAccountsComponent', () => {
  let component: ManageAccountsComponent;
  let fixture: ComponentFixture<ManageAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzSelectModule,NzTableModule,NzDrawerModule,FormsModule],
      declarations: [ ManageAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
