import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-box-editor-markdown',
  templateUrl: './box-editor-markdown.component.html',
  styleUrl: './box-editor-markdown.component.scss',
  standalone: false
})
export class BoxEditorMarkdownComponent {
  @Input() text =''
  @Input() maxBox = 0
  @Input() index =1
  @Output() textChange = new EventEmitter<string>();
  @Output() onRemove = new EventEmitter<number>();
  @Output() onIndexChange = new EventEmitter<{current:number,target:number}>();

  private resizing = false;
  private target!: HTMLElement;
  private startY = 0;
  private startHeight = 0;

  startResize(event: MouseEvent, el: HTMLElement) {
    this.resizing = true;
    this.target = el;
    this.startY = event.clientY;
    this.startHeight = el.offsetHeight;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this.resizing && this.target) {
      const newHeight = this.startHeight + (e.clientY - this.startY);
      this.target.style.height = newHeight + 'px';
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.resizing = false;
  }

  remove(){
    this.onRemove.emit(this.index);
  }

  up(){
    if (this.index>1) this.onIndexChange.emit({current:this.index,target:this.index-1})
    
  }

  down(){
    if (this.index<this.maxBox) this.onIndexChange.emit({current:this.index,target:this.index+1})
  }

  applyBold(el: HTMLTextAreaElement) {
    this.wrapSelection(el, '**', '**');
  }

  applyItalicize(el: HTMLTextAreaElement) {
    this.wrapSelection(el, '*', '*');
  }


  private wrapSelection(el: HTMLTextAreaElement, before = '**', after = '**') {
    const start = el.selectionStart ?? 0;
    const end   = el.selectionEnd   ?? 0;
    const value = el.value ?? '';

    const scroll = el.scrollTop;

    const selected = value.slice(start, end);

    const alreadyWrapped = selected.startsWith(before) && selected.endsWith(after);
    let newText: string;
    let newCaretStart: number;
    let newCaretEnd: number;

    if (start !== end) {
      if (alreadyWrapped) {
        const unwrapped = selected.slice(before.length, selected.length - after.length);
        newText = value.slice(0, start) + unwrapped + value.slice(end);
        newCaretStart = start;
        newCaretEnd = start + unwrapped.length;
      } else {
        const wrapped = `${before}${selected}${after}`;
        newText = value.slice(0, start) + wrapped + value.slice(end);
        newCaretStart = start + before.length;
        newCaretEnd = newCaretStart + selected.length;
      }
    } else {
      const insert = `${before}${after}`;
      newText = value.slice(0, start) + insert + value.slice(end);
      newCaretStart = start + before.length;
      newCaretEnd = newCaretStart;
    }

    el.value = newText;
    this.text = newText; 
    this.textChange.emit(newText)

    el.selectionStart = newCaretStart;
    el.selectionEnd   = newCaretEnd;
    el.scrollTop = scroll;

    el.focus();
  }


}
