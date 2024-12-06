import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFullInvoiceComponent } from './show-full-invoice.component';

describe('ShowFullInvoiceComponent', () => {
  let component: ShowFullInvoiceComponent;
  let fixture: ComponentFixture<ShowFullInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFullInvoiceComponent ]
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
