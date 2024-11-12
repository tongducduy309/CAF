import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteProductComponent } from './note-product.component';

describe('NoteProductComponent', () => {
  let component: NoteProductComponent;
  let fixture: ComponentFixture<NoteProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
