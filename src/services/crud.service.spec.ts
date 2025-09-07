import { TestBed } from '@angular/core/testing';

import { CrudService } from './crud.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CrudService', () => {
  let service: CrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi())]
});
    service = TestBed.inject(CrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test01', () => {
    service.get("users",'123').subscribe((res:any)=>{

      expect(res).toBeNull();
    })

  });
});
