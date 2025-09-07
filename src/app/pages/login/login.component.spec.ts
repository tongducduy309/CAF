import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgZorroAntModule } from 'src/app/ng-zorro-ant.module';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MainService } from 'src/services/main.service';
import { UserService } from 'src/services/user.service';
import { of } from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CrudService } from 'src/services/crud.service';




describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let userService: any; // Use any for the mock to avoid type issues
  let crudService: any;
  const mockUserService = jasmine.createSpyObj('UserService', ['login_method_2']);
  const mockCrudService = jasmine.createSpyObj('CrudService', ['get']);
  // const routerSpy = { navigate: jasmine.createSpy('navigate') };
const mockMainService = jasmine.createSpyObj('MainService', ['createNotification']);
// let mockRouter = {
// 	navigate: jasmine.createSpy('navigate')
// }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [LoginComponent],
    imports: [RouterTestingModule],
    providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: MainService, useValue: mockMainService },
        { provide: CrudService, useValue: mockCrudService },
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService);
    crudService = TestBed.inject(CrudService);
  });

  it('test01', () => {
    component.user_email = '';
    component.user_password = '';
    component.submit();

    expect(mockMainService.createNotification).toHaveBeenCalledWith('info', 'Vui lòng điền đầy đủ thông tin');
    // expect(router.navigate).toHaveBeenCalled();
  });

  it('test02', () => {
    component.user_email = 'invalid';
    component.user_password = '123456789';
    component.submit();

    expect(mockMainService.createNotification).toHaveBeenCalledWith('info', 'Email không hợp lệ, email phải chưa "@" (Ví dụ: vidu@example.com)');
    // expect(router.navigate).not.toHaveBeenCalled();
  });
  it('test03', async () => {

    component.user_email = 'success@dev.com';
    component.user_password = '123456789';
    mockUserService.login_method_2.and.returnValue(null);

    await component.submit();

    expect(mockUserService.login_method_2).toHaveBeenCalledWith('success@dev.com', '123456789');
    // expect(mockRouter.navigate).not.toHaveBeenCalledWith (['']);
  });

  it('test04', async () => {
    const mockUser = {id: 13, fullname: 'Success', email: 'success@dev.com', point: 0, verify: true, role: 0, status: true, created: '2024-12-11T13:35:29.584Z', result: 'Success'};
    component.user_email = 'success@dev.com';
    component.user_password = '12345678';
    mockUserService.login_method_2.and.returnValue(of(mockUser));

    await component.submit();

    expect(mockUserService.login_method_2).toHaveBeenCalledWith('success@dev.com', '12345678');
    // expect(component.UserEmitter.emit).toHaveBeenCalledWith(mockUser);
    // expect(mockRouter.navigate).toHaveBeenCalledWith (['home']);
  });

  it('test05', waitForAsync(async () => {

    component.resetYP_email = 'invalid';
    component.submit_resetPW();

    expect(mockMainService.createNotification).toHaveBeenCalledWith("info", 'Email không hợp lệ, email phải chưa "@" (Ví dụ: vidu@example.com)');
  }));

  it('test06', waitForAsync(async () => {

    component.resetYP_email = 'invalid@email.com';
    mockCrudService.get.and.returnValue(of({ result: 'Not Exist' }));
    component.submit_resetPW();

    expect(mockCrudService.get).toHaveBeenCalledWith("reset-your-password", "invalid@email.com");
    expect(mockMainService.createNotification).toHaveBeenCalledWith("info", "Tài khoản không tồn tại");
  }));

  it('test07', waitForAsync(async () => {

    component.resetYP_email = 'invalid@email.com';
    mockCrudService.get.and.returnValue(of({ result: 'success' }));
    component.submit_resetPW();

    expect(mockCrudService.get).toHaveBeenCalledWith("reset-your-password", "invalid@email.com");
    expect(component.isSendEmailSuccess).toEqual(true)
  }));


});
