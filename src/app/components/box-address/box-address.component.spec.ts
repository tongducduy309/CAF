import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxAddressComponent } from './box-address.component';

describe('BoxAddressComponent', () => {
  let component: BoxAddressComponent;
  let fixture: ComponentFixture<BoxAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
