import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchToolComponent } from './search-tool.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';

describe('SearchToolComponent', () => {
  let component: SearchToolComponent;
  let fixture: ComponentFixture<SearchToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzSpinModule,NzIconModule,FormsModule],
      declarations: [ SearchToolComponent ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
