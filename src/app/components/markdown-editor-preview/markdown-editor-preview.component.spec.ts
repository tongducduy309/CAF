import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownEditorPreviewComponent } from './markdown-editor-preview.component';

describe('MarkdownEditorPreviewComponent', () => {
  let component: MarkdownEditorPreviewComponent;
  let fixture: ComponentFixture<MarkdownEditorPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownEditorPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkdownEditorPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
