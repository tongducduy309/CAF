import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersComponent } from './vouchers.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { LeftOutline } from '@ant-design/icons-angular/icons';

describe('VouchersComponent', () => {
  let component: VouchersComponent;
  let fixture: ComponentFixture<VouchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzSpinModule,NzSelectModule,NzTableModule,NzDrawerModule,FormsModule,ReactiveFormsModule],
      declarations: [ VouchersComponent ],
      providers:[{ provide: NZ_ICONS, useValue: [LeftOutline] }]

    })
    .compileComponents();

    fixture = TestBed.createComponent(VouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
