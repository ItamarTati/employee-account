import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee, EmployeeAddress, TokenResponse } from './api.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}
  private readonly url = 'https://example-be.com/';

  getEmployee(employeeId: number): Observable<Employee> {
    const endPoint = `${this.url}/list/employee/${employeeId}`;
    // return this.httpClient.get<Employee>(endPoint);
    const dummyEmployee: Employee = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    };
    return of(dummyEmployee);
  }

  getEmployeeAddress(employeeId: number): Observable<EmployeeAddress> {
    const endPoint = `${this.url}/list/employee/addresss/${employeeId}`;
    // return this.httpClient.get<EmployeeAddress>(endPoint);
    const dummyAddress: EmployeeAddress = {
      streetAddress: '123 Main St',
      City: 'Cityville'
    };
    return of(dummyAddress);
  }

  generateToken(): Observable<TokenResponse> {
    const endPoint = `${this.url}/generate/open/jwt`;
    // return this.httpClient.get<TokenResponse>(endPoint);
    const dummyTokenResponse: TokenResponse = {
      token: 'dummyToken'
    };
    return of(dummyTokenResponse);
  }
}
