import { Component, inject } from '@angular/core';
import { CreateBlogRequest, CreateBoxBlogRequest } from 'src/app/dto/request/Blog';
import { ResponseObject } from 'src/app/models/ResponseObject';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-markdown-editor-preview',
  templateUrl: './markdown-editor-preview.component.html',
  styleUrl: './markdown-editor-preview.component.scss',
  standalone: false
})
export class MarkdownEditorPreviewComponent {
  boxes = [
    `\`\`\`bash
git clone https://github.com/tongducduy309/CAF.git
cd CAF
\`\`\``,"b","c"
  ]
  private KEY = 'md-playground';
  text=''

  blogService = inject(BlogService)


  persist() { localStorage.setItem(this.KEY, this.text); }
  reset() { this.text = '# Tiêu đề\n\nViết thử *Markdown* tại đây…'; this.persist(); }

  selectedValue = 'Code';
  options = ['Code', 'Preview',];

  handleModelChange(value: string): void {
    if (value=="Preview"){
      this.text = this.boxes.join("\n </br> \n")
    }
  }


  save(){
    const boxes: CreateBoxBlogRequest[] = this.boxes.map((box: string, index) => ({ index: index, content: box }));
    const request: CreateBlogRequest = {
      title: "From our passion to your single cup of coffee",
      subtitle: "Coffee is a beverage brewed from the roasted and ground seeds of the tropical evergreen coffee plant. Coffee is one of the three most popular beverages in the world (alongside water and tea)",
      region: "EN",
      categoryId:"tra-sua",
      boxes: boxes as CreateBoxBlogRequest[]
    };
    this.blogService.create(request).then((res:ResponseObject)=>{
      console.log(res)
    });
  }

  new(){
    this.boxes.push("")
  }

  remove(index:number){
    index--;
    this.boxes=this.boxes.filter((_,i)=>i!=index)
  }

  changeIndex(e:{current:number;target:number}){
    const {current,target} = {current:e.current-1,target:e.target-1}
    const tmp = this.boxes[current]
    this.boxes[current] = this.boxes[target]
    this.boxes[target] = tmp
  }

  
}
