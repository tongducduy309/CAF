import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class PageTitleService {
  private title = inject(Title);
  private translate = inject(TranslateService);

  setTitle(key: string, params?: Record<string, any>) {
    this.translate.get(key, params).subscribe(translated => {
      this.title.setTitle(translated);
    });
  }
}
