
// Unit tests for: getData


import { ManageAccountsComponent } from '../manage-accounts.component';




// Mock classes
class MockRouter {
  public events = {
    subscribe: jest.fn()
  };
}

class MockCrudService {
  public get = jest.fn();
}

class MockMainService {
  public createNotification = jest.fn();
}

class MockActivatedRoute {
  public paramMap = {
    subscribe: jest.fn()
  };
}

describe('ManageAccountsComponent.getData() getData method', () => {
  let component: ManageAccountsComponent;
  let mockRouter: MockRouter;
  let mockCrudService: MockCrudService;
  let mockMainService: MockMainService;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(() => {
    mockRouter = new MockRouter() as any;
    mockCrudService = new MockCrudService() as any;
    mockMainService = new MockMainService() as any;
    mockActivatedRoute = new MockActivatedRoute() as any;

    component = new ManageAccountsComponent(
      mockRouter as any,
      mockCrudService as any,
      mockMainService as any,
      mockActivatedRoute as any
    );
  });

  describe('Happy Paths', () => {
    it('should call getCustomers when title is "accounts-customer"', () => {
      // Arrange
      component.title = 'accounts-customer';
      const getCustomersSpy = jest.spyOn(component, 'getCustomers' as any);

      // Act
      component.getData();

      // Assert
      expect(getCustomersSpy).toHaveBeenCalled();
    });

    it('should call getStaffs when title is not "accounts-customer"', () => {
      // Arrange
      component.title = 'accounts-staff';
      const getStaffsSpy = jest.spyOn(component, 'getStaffs' as any);

      // Act
      component.getData();

      // Assert
      expect(getStaffsSpy).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined title gracefully', () => {
      // Arrange
      component.title = undefined;

      // Act
      component.getData();

      // Assert
      // No exception should be thrown, and one of the methods should be called
      expect(mockCrudService.get).not.toHaveBeenCalled();
    });

    it('should handle null title gracefully', () => {
      // Arrange
      component.title = null;

      // Act
      component.getData();

      // Assert
      // No exception should be thrown, and one of the methods should be called
      expect(mockCrudService.get).not.toHaveBeenCalled();
    });
  });
});

// End of unit tests for: getData
