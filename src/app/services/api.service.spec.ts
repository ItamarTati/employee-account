import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Employee, EmployeeAddress, TokenResponse } from './api.interface';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve employee data', (done) => {
    const employeeId = 123;
    const dummyEmployee: Employee = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    };

    service.getEmployee(employeeId).subscribe((employee) => {
      expect(employee).toEqual(dummyEmployee);
      done();
    });
  }, 5000);

  it('should retrieve employee address', (done) => {
    const employeeId = 123;
    const dummyAddress: EmployeeAddress = {
      streetAddress: '123 Main St',
      city: 'Cityville',
    };

    service.getEmployeeAddress(employeeId).subscribe((address) => {
      expect(address).toEqual(dummyAddress);
      done();
    });
  }, 5000);

  it('should generate token', (done) => {
    const dummyTokenResponse: TokenResponse = {
      token: 'dummyToken',
    };

    service.generateToken().subscribe((tokenResponse) => {
      expect(tokenResponse).toEqual(dummyTokenResponse);
      done();
    });
  }, 10000);

  // Uncomment and modify the following tests once the API endpoints are implemented

  // it('should retrieve an employee', () => {
  //   const employeeId = 1;
  //   const dummyEmployee: Employee = {
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     age: 30,
  //   };

  //   service.getEmployee(employeeId).subscribe((employee) => {
  //     expect(employee).toEqual(dummyEmployee);
  //   });

  //   const req = httpMock.expectOne(`${service.getUrl()}/list/employee/${employeeId}`);
  //   expect(req.request.method).toEqual('GET');
  //   req.flush(dummyEmployee);
  // });

  // it('should retrieve an employee address', () => {
  //   const employeeId = 1;
  //   const dummyAddress: EmployeeAddress = {
  //     streetAddress: '123 Main St',
  //     city: 'Cityville',
  //   };

  //   service.getEmployeeAddress(employeeId).subscribe((address) => {
  //     expect(address).toEqual(dummyAddress);
  //   });

  //   const req = httpMock.expectOne(`${service.getUrl()}/list/employee/addresss/${employeeId}`);
  //   expect(req.request.method).toEqual('GET');
  //   req.flush(dummyAddress);
  // });

  // it('should generate a token', () => {
  //   const dummyTokenResponse: TokenResponse = {
  //     token: 'dummyToken',
  //   };

  //   service.generateToken().subscribe((response) => {
  //     expect(response).toEqual(dummyTokenResponse);
  //   });

  //   const req = httpMock.expectOne(`${service.getUrl()}/generate/open/jwt`);
  //   expect(req.request.method).toEqual('GET');
  //   req.flush(dummyTokenResponse);
  // });
});
