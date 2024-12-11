import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsComponent } from './collections.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CollectionComponent } from 'src/app/components/collection/collection.component';

describe('CollectionsComponent', () => {
  let component: CollectionsComponent;
  let fixture: ComponentFixture<CollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzGridModule],
      declarations: [ CollectionsComponent,CollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
