import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VnpReturnComponent } from './vnp-return.component';

describe('VnpReturnComponent', () => {
  let component: VnpReturnComponent;
  let fixture: ComponentFixture<VnpReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VnpReturnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VnpReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
