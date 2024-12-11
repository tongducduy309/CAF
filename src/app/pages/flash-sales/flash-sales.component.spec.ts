import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashSalesComponent } from './flash-sales.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzTableModule } from 'ng-zorro-antd/table';

describe('FlashSalesComponent', () => {
  let component: FlashSalesComponent;
  let fixture: ComponentFixture<FlashSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzTableModule],
      declarations: [ FlashSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
