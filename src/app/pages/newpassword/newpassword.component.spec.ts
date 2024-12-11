import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpasswordComponent } from './newpassword.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { FormsModule } from '@angular/forms';
import { NgZorroAntModule } from 'src/app/ng-zorro-ant.module';

describe('NewpasswordComponent', () => {
  let component: NewpasswordComponent;
  let fixture: ComponentFixture<NewpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NgZorroAntModule,FormsModule],
      declarations: [ NewpasswordComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
