import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NzBreakpointService, BreakpointMap, NzBreakpointEnum } from 'ng-zorro-antd/core/services';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private currentBreakpoint$ = new BehaviorSubject<NzBreakpointEnum>(NzBreakpointEnum.md);

  constructor(private breakpointService: NzBreakpointService) {


    this.breakpointService
      .subscribe({
        xxl: NzBreakpointEnum.xxl,
        xl: NzBreakpointEnum.xl,
        lg: NzBreakpointEnum.lg,
        md: NzBreakpointEnum.md,
        sm: NzBreakpointEnum.sm,
        xs: NzBreakpointEnum.xs
      })
      .subscribe((bp: NzBreakpointEnum) => {
        this.currentBreakpoint$.next(bp);
      });
  }

  get breakpoint$(): Observable<NzBreakpointEnum> {
    return this.currentBreakpoint$.asObservable();
  }

  get isMobile$(): Observable<boolean> {
    return this.breakpoint$.pipe(map(bp => bp === 'xs'));
  }

  get isDesktop$(): Observable<boolean> {
    return this.breakpoint$.pipe(map(bp => bp === 'sm'));
  }

  getCurrentBreakpoint(): NzBreakpointEnum {
    return this.currentBreakpoint$.getValue();
  }
}
