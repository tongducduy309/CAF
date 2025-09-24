
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/services/crud.service';
import { MainService } from 'src/services/main.service';
import { UserService } from 'src/services/user.service';
import { Title } from '@angular/platform-browser';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from './services/loading.service';
import { LayoutService } from './services/layout.service';
import { Subscription, take, timer } from 'rxjs';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent{
  passwordVisible = false;
  user_password?: string;
  loading:any = true
  header_footer_visible = true
  user:any=null;
  total = 0

  loading$ = this.loadingService.loading$;
  private subs = new Subscription();

  readonly READY_FALLBACK = 8000;

  // private router = inject(Router);
  // private activatedRoute = inject(ActivatedRoute);
  private title = inject(Title);
  private translate = inject(TranslateService);

  constructor (private crud:CrudService, private main:MainService, private userS:UserService, private loadingService: LoadingService,
    private layoutService: LayoutService, private router: Router,){
      this.subs.add(
      this.router.events.subscribe(ev => {
        if (ev instanceof NavigationStart) {
          this.loadingService.show();
        } else if (ev instanceof NavigationEnd || ev instanceof NavigationCancel || ev instanceof NavigationError) {
         
          const readySub = this.layoutService.ready$.pipe(take(1)).subscribe({
            next: () => {
              this.loadingService.hide();
              readySub.unsubscribe();
            },
            error: () => {
              this.loadingService.hide();
              readySub.unsubscribe();
            }
          });

          const t = timer(this.READY_FALLBACK).pipe(take(1)).subscribe(() => {
            this.loadingService.hide();
            try { readySub.unsubscribe(); } catch {}
            t.unsubscribe();
          });
        }
      })
      
    );

    this.subs.add(
        this.loadingService.loading$.subscribe(isLoading => {
          if (isLoading) document.body.style.overflow = 'hidden'
      else document.body.style.overflow = 'auto'
        })
      )
    
  }

  

  setTitle(key: string, params?: Record<string, any>) {
    this.translate.get(key, params).subscribe(translated => {
      this.title.setTitle(translated);
    });
  }

  




}
