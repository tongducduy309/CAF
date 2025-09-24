
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readySub = new Subject<void>();
  ready$ = this.readySub.asObservable();

  setReady() {
    this.readySub.next();
  }
}
