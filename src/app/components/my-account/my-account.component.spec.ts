import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAccountComponent } from './my-account.component';
import { ApiService } from '../../services/api.service';
import {
  CombinedInfo,
  Employee,
  EmployeeAddress,
  TokenResponse,
} from '../../services/api.interface';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MyAccountComponent', () => {
  let component: MyAccountComponent;
  let fixture: ComponentFixture<MyAccountComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyAccountComponent],
      providers: [ApiService],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    jest
      .spyOn(apiService, 'generateToken')
      .mockReturnValue(of({ token: 'dummyToken' } as TokenResponse));
  });

  it('should load data and set combinedInfo and token', () => {
    const employeeId = 123;
    const employee: Employee = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    };
    const address: EmployeeAddress = {
      streetAddress: '123 Main St',
      city: 'Cityville',
    };
    jest.spyOn(apiService, 'getEmployee').mockReturnValue(of(employee));
    jest.spyOn(apiService, 'getEmployeeAddress').mockReturnValue(of(address));

    component.ngOnInit();
    fixture.detectChanges();

    expect(apiService.generateToken).toHaveBeenCalled();
    expect(apiService.getEmployee).toHaveBeenCalledWith(employeeId);
    expect(apiService.getEmployeeAddress).toHaveBeenCalledWith(employeeId);

    expect(component.token$).toBeDefined();
    component.token$!.subscribe((token) => {
      expect(token).toBe('dummyToken');
    });

    expect(component.combinedInfo$).toBeDefined();
    component.combinedInfo$!.subscribe((combinedInfo) => {
      expect(combinedInfo).toEqual({
        firstName: 'John',
        lastName: 'Doe',
        streetAddress: '123 Main St',
        city: 'Cityville',
      } as CombinedInfo);
    });

    expect(component.loading$.value).toBe(false);
    expect(component.error$.value).toBe(null);
  });

  it('should handle error when generating token', () => {
    const error = 'Token generation error';
    jest.spyOn(apiService, 'generateToken').mockReturnValue(throwError(error));

    component.ngOnInit();
    fixture.detectChanges();

    expect(apiService.generateToken).toHaveBeenCalled();

    expect(component.token$).toBeDefined();
    component.token$!.subscribe((token) => {
      expect(token).toBe('Error generating JWT token.');
    });

    expect(component.loading$.value).toBe(false);
    expect(component.error$.value).toBe('Error generating JWT token.');
  });

  it('should handle error when getting employee', () => {
    const error = 'Error getting employee';
    jest.spyOn(apiService, 'getEmployee').mockReturnValue(throwError(error));

    component.ngOnInit();
    fixture.detectChanges();

    expect(apiService.generateToken).toHaveBeenCalled();
    expect(apiService.getEmployee).toHaveBeenCalled();

    expect(component.combinedInfo$).toBeDefined();
    component.combinedInfo$!.subscribe((combinedInfo) => {
      expect(combinedInfo).toBe(null);
    });

    expect(component.loading$.value).toBe(false);
    expect(component.error$.value).toBe('Error getting employee.');
  });

  it('should handle error when getting employee address', () => {
    const error = 'Error getting employee address';
    jest.spyOn(apiService, 'getEmployee').mockReturnValue(
      of({
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
      } as Employee),
    );
    jest
      .spyOn(apiService, 'getEmployeeAddress')
      .mockReturnValue(throwError(error));

    component.ngOnInit();
    fixture.detectChanges();

    expect(apiService.generateToken).toHaveBeenCalled();
    expect(apiService.getEmployee).toHaveBeenCalled();
    expect(apiService.getEmployeeAddress).toHaveBeenCalled();

    expect(component.combinedInfo$).toBeDefined();
    component.combinedInfo$!.subscribe((combinedInfo) => {
      expect(combinedInfo).toBe(null);
    });

    expect(component.loading$.value).toBe(false);
    expect(component.error$.value).toBe('Error getting employee address.');
  });
});
