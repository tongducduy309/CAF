import { TestBed, waitForAsync } from '@angular/core/testing';

import { UserService } from './user.service';
import { NzNotificationServiceModule } from 'ng-zorro-antd/notification';
import { MainService } from './main.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserService', () => {
  let service: UserService;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,NzNotificationServiceModule,BrowserModule,
        BrowserAnimationsModule]
    });
    service = TestBed.inject(UserService);
  });

  it('test01', async () => {
    const result = await service.login_method_1('');
    expect(result).toBeNull();
  });

  it('test02', waitForAsync (async () => {
    const result = await service.login_method_1('invalid_token');
    expect(result).toBeNull();

  }));

  it('test03', waitForAsync (async () => {
    const result = await service.login_method_1('not_verify');
    expect(result).toBeNull();

  }));

  it('test04', waitForAsync (async () => {
    const result = await service.login_method_1('blocked');
    expect(result).toBeNull();

  }));

  it('test05', waitForAsync (async () => {
    const result = await service.login_method_1('success');
    expect(result).toEqual({
      id: 13,
    fullname: 'Success',
    token: 'success'
    });

  }));

  it('test06', waitForAsync (async () => {
    const result = await service.login_method_2('','');
    expect(result).toBeNull();

  }));
  it('test07', waitForAsync (async () => {
    const result = await service.login_method_2('','password');
    expect(result).toBeNull();

  }));
  it('test08', waitForAsync (async () => {
    const result = await service.login_method_2('email@dev.com','');
    expect(result).toBeNull();

  }));
  it('test09', waitForAsync (async () => {
    const result = await service.login_method_2('email@dev.com','password');
    expect(result).toBeNull();

  }));
  it('test10', waitForAsync (async () => {
    const result = await service.login_method_2('blocked@dev.com','12345678');
    expect(result).toBeNull();

  }));
  it('test11', waitForAsync (async () => {
    const result = await service.login_method_2('notverify@dev.com','123456789');
    expect(result).toBeNull();

  }));
  it('test12', waitForAsync (async () => {
    const result = await service.login_method_2('success@dev.com','1234567890');
    expect(result).toBeNull();

  }));
  it('test13', waitForAsync (async () => {
    const result = await service.login_method_2('success@dev.com','12345678');
    expect(result).toEqual({
      id: 13,
    fullname: 'Success',
    token: 'success'
    });

  }));
  it('test14', waitForAsync (async () => {
    const result = await service.getUser(null,null,null);
    expect(result).toBeNull();

  }));
  it('test15', waitForAsync (async () => {
    const result = await service.getUser(null,'password',null);
    expect(result).toBeNull();

  }));
  it('test16', waitForAsync (async () => {
    const result = await service.getUser('email@dev.com',null,null);
    expect(result).toBeNull();

  }));
  it('test17', waitForAsync (async () => {
    const result = await service.getUser(null,null,'invalid_token');
    expect(result).toEqual({result: 'Not Exist'});

  }));
  it('test18', waitForAsync (async () => {
    const result = await service.getUser(null,null,'not_verify');
    expect(result).toEqual({result: 'Not Verify'});

  }));
  it('test19', waitForAsync (async () => {
    const result = await service.getUser(null,null,'blocked');
    expect(result).toEqual({result: 'Blocked'});

  }));
  it('test20', waitForAsync (async () => {
    const result = await service.getUser(null,null,'success');
    expect(result).toEqual({id: 13, fullname: 'Success', email: 'success@dev.com', point: 0, verify: true, role: 0, status: true, created: '2024-12-11T13:35:29.584Z', result: 'Success'});

  }));
  it('test21', waitForAsync (async () => {
    const result = await service.getUser('success@dev.com','1234567890',null);
    expect(result).toEqual({result: 'Wrong Password'});

  }));
  it('test22', waitForAsync (async () => {
    const result = await service.getUser('success@dev.com','12345678',null);
    expect(result).toEqual({id: 13, fullname: 'Success', email: 'success@dev.com', point: 0, verify: true, token: 'success', role: 0, status: true, created: '2024-12-11T13:35:29.584Z', result: 'Success'});

  }));
  it('test23', waitForAsync (async () => {
    const result = await service.getUser('email@dev.com','password',null);
    expect(result).toEqual({result: 'Not Exist'});

  }));
  it('test24', waitForAsync (async () => {
    const result = await service.getUser('blocked@dev.com','12345678',null);
    expect(result).toEqual({result: 'Blocked'});

  }));
  it('test25', waitForAsync (async () => {
    const result = await service.getUser('notverify@dev.com','123456789',null);
    expect(result).toEqual({result: 'Not Verify'});

  }));



});
