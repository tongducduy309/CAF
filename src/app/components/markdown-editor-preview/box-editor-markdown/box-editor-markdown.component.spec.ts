import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxEditorMarkdownComponent } from './box-editor-markdown.component';

describe('BoxEditorMarkdownComponent', () => {
  let component: BoxEditorMarkdownComponent;
  let fixture: ComponentFixture<BoxEditorMarkdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxEditorMarkdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxEditorMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
