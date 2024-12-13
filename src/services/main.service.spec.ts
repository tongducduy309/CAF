import { TestBed } from '@angular/core/testing';

import { MainService } from './main.service';
import { NzNotificationService, NzNotificationServiceModule } from 'ng-zorro-antd/notification';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('MainService', () => {
  let service: MainService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[NzNotificationServiceModule,BrowserAnimationsModule ],
    });
    service = TestBed.inject(MainService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('test01', () => {
    service.setCookie('testCookie', 'testValue');
    const cookies = document.cookie.split(';');
    expect(cookies).toContain('testCookie=testValue');
  });

  it('test02', () => {
    service.setCookie('testCookie', 'testValue', 60); // Expires in 60 minutes
    const cookies = document.cookie.split(';');
    expect(cookies).toContain('testCookie=testValue');
  });

  it('test03', () => {
    service.setCookie('testCookie', 'testValue', -1);
    const cookies = document.cookie.split(';');
    expect(cookies).not.toContain('testCookie=testValue');
  });
});

