import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzI18nService, vi_VN, en_US } from 'ng-zorro-antd/i18n';

@Injectable({ providedIn: 'root' })
export class LangService {
  private t = inject(TranslateService);
  private z = inject(NzI18nService);

  readonly supported = ['vi', 'en'] as const;

  current(): 'vi'|'en' {
    return (this.t.currentLang as any) || 'vi';
  }

  use(lang: 'vi'|'en') {
    this.t.use(lang);
    localStorage.setItem('lang', lang);
    this.z.setLocale(lang === 'vi' ? vi_VN : en_US);
  }
}
