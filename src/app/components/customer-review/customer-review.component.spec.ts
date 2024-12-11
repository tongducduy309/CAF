import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReviewComponent } from './customer-review.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';

describe('CustomerReviewComponent', () => {
  let component: CustomerReviewComponent;
  let fixture: ComponentFixture<CustomerReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzRateModule,FormsModule],
      declarations: [ CustomerReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
