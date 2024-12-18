
// Unit tests for: getCustomers


import { NavigationEnd } from '@angular/router';
import { ManageAccountsComponent } from '../manage-accounts.component';


import { of } from 'rxjs';


// Mock classes
class MockRouter {
  public events = of(new NavigationEnd(0, '', ''));
}

class MockCrudService {
  public get = jest.fn();
}

class MockMainService {
  public createNotification = jest.fn();
}

class MockActivatedRoute {
  public paramMap = of({
    get: jest.fn().mockReturnValue('accounts-customer')
  });
}

describe('ManageAccountsComponent.getCustomers() getCustomers method', () => {
  let component: ManageAccountsComponent;
  let mockRouter: MockRouter;
  let mockCrudService: MockCrudService;
  let mockMainService: MockMainService;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(() => {
    mockRouter = new MockRouter();
    mockCrudService = new MockCrudService();
    mockMainService = new MockMainService();
    mockActivatedRoute = new MockActivatedRoute();

    component = new ManageAccountsComponent(
      mockRouter as any,
      mockCrudService as any,
      mockMainService as any,
      mockActivatedRoute as any
    );
  });

  describe('Happy Paths', () => {
    it('should populate accounts and accounts_v when API returns success', () => {
      // Arrange
      const mockResponse = {
        result: 'success',
        data: [{ id: 1, name: 'Customer 1' }, { id: 2, name: 'Customer 2' }]
      };
      mockCrudService.get.mockReturnValue(of(mockResponse as any));

      // Act
      component.getCustomers();

      // Assert
      expect(component.accounts).toEqual(mockResponse.data);
      expect(component.accounts_v).toEqual(mockResponse.data);
      expect(mockMainService.createNotification).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle API failure and show error notification', () => {
      // Arrange
      const mockResponse = {
        result: 'failure',
        data: []
      };
      mockCrudService.get.mockReturnValue(of(mockResponse as any));

      // Act
      component.getCustomers();

      // Assert
      expect(component.accounts).toEqual([]);
      expect(component.accounts_v).toEqual([]);
      expect(mockMainService.createNotification).toHaveBeenCalledWith('error', 'Lấy dữ liệu thất bại');
    });

    it('should handle empty data response gracefully', () => {
      // Arrange
      const mockResponse = {
        result: 'success',
        data: []
      };
      mockCrudService.get.mockReturnValue(of(mockResponse as any));

      // Act
      component.getCustomers();

      // Assert
      expect(component.accounts).toEqual([]);
      expect(component.accounts_v).toEqual([]);
      expect(mockMainService.createNotification).not.toHaveBeenCalled();
    });
  });
});

// End of unit tests for: getCustomers
