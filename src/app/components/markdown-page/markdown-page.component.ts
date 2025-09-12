// src/app/shared/markdown-page.component.ts
import { Component, Input, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';
import { Subscription, of, switchMap, catchError } from 'rxjs';

@Component({
  selector: 'app-markdown-page',
  templateUrl: './markdown-page.component.html',
  styleUrls: ['./markdown-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class MarkdownPageComponent implements OnInit, OnDestroy {
  @Input({ required: true }) slug!: string;                   // ví dụ: 'about'
  @Input() basePath = 'assets/docs';
  @Input() fallbackLang: 'vi'|'en' = 'en';

  private http = inject(HttpClient);
  private translate = inject(TranslateService);
  private sub?: Subscription;

  loading = true;
  content = '';
  error: string | null = null;

  ngOnInit() {
    this.loadFor((this.translate.currentLang as 'vi'|'en') || 'vi').subscribe();

    this.sub = this.translate.onLangChange
      .pipe(switchMap(ev => this.loadFor(ev.lang as 'vi'|'en')))
      .subscribe();
  }

  private loadFor(lang: 'vi'|'en') {
    this.loading = true; this.error = null; this.content = '';
    const path = `${this.basePath}/${lang}/${this.slug}.md`;

    return this.http.get(path, { responseType: 'text' }).pipe(
      switchMap(md => { this.content = md; this.loading = false; return of(null); }),
      catchError(() => {
        if (this.fallbackLang && this.fallbackLang !== lang) {
          const fb = `${this.basePath}/${this.fallbackLang}/${this.slug}.md`;
          return this.http.get(fb, { responseType: 'text' }).pipe(
            switchMap(md => { this.content = md; this.loading = false; return of(null); }),
            catchError(() => { this.loading = false; this.error = `Không tìm thấy: ${path}`; return of(null); })
          );
        }
        this.loading = false; this.error = `Không tìm thấy: ${path}`;
        return of(null);
      })
    );
  }

  ngOnDestroy(){ this.sub?.unsubscribe(); }
}
