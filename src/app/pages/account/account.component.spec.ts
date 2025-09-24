import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzGridModule } from 'ng-zorro-antd/grid';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzGridModule, ],
      declarations: [ AccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
