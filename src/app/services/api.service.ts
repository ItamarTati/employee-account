import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee, EmployeeAddress, TokenResponse } from './api.interface';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}
  private readonly url = 'https://example-be.com/';

  private readonly dummyEmployee: Employee = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
  };

  private readonly dummyAddress: EmployeeAddress = {
    streetAddress: '123 Main St',
    city: 'Cityville',
  };

  private readonly dummyTokenResponse: TokenResponse = {
    token: 'dummyToken',
  };

  getEmployee(employeeId: number): Observable<Employee> {
    const endPoint = `${this.url}/list/employee/${employeeId}`;
    // return this.httpClient.get<Employee>(endPoint);
    return of(this.dummyEmployee).pipe(delay(2500));
  }

  getEmployeeAddress(employeeId: number): Observable<EmployeeAddress> {
    const endPoint = `${this.url}/list/employee/addresss/${employeeId}`;
    // return this.httpClient.get<EmployeeAddress>(endPoint);
    return of(this.dummyAddress).pipe(delay(2500));
  }

  generateToken(): Observable<TokenResponse> {
    const endPoint = `${this.url}/generate/open/jwt`;
    // return this.httpClient.get<TokenResponse>(endPoint);
    return of(this.dummyTokenResponse).pipe(delay(5000));
  }
  getUrl() {
    return this.url;
  }
}
