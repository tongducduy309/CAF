import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.scss',
  standalone:false
})
export class PublicLayoutComponent implements OnDestroy {
  isBackgroundTransparentHeader = true 
  private destroy$ = new Subject<void>();
  constructor(private router: Router, private route: ActivatedRoute){
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const child = this.getDeepestChild(this.route);
      const data = child.snapshot.data;
      this.isBackgroundTransparentHeader = !(data?.['is_bg_header']?? true as boolean) ; 
    });
  }

  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    let r = route;
    while (r.firstChild) r = r.firstChild;
    return r;
  }

  ngOnDestroy(){ this.destroy$.next(); this.destroy$.complete(); }
}
