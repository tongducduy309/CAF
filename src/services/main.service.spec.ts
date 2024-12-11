import { TestBed } from '@angular/core/testing';

import { MainService } from './main.service';
import { NzNotificationServiceModule } from 'ng-zorro-antd/notification';

describe('MainService', () => {
  let service: MainService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[NzNotificationServiceModule]
    });
    service = TestBed.inject(MainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
