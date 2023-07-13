import { Component, OnInit } from '@angular/core';
import {
  Observable,
  switchMap,
  catchError,
  of,
  map,
  BehaviorSubject,
  tap,
} from 'rxjs';
import { CombinedInfo } from 'src/app/services/api.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  public combinedInfo$: Observable<CombinedInfo | null> | null = null;
  public token$: Observable<string> | null = null;
  public loading$ = new BehaviorSubject<boolean>(true);
  public error$ = new BehaviorSubject<string | null>(null);

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.token$ = this.apiService.generateToken().pipe(
      map((tokenResponse) => {
        const employeeId = 123;
        const token = tokenResponse.token;
        this.getCombinedInfo(employeeId);
        return token;
      }),
      catchError((error) => {
        console.error('Error generating JWT token:', error);
        this.loading$.next(false);
        this.error$.next('Error generating JWT token.');
        return of('Error generating JWT token.');
      }),
    );
  }

  private getCombinedInfo(employeeId: number): void {
    this.combinedInfo$ = this.apiService.getEmployee(employeeId).pipe(
      switchMap((employee) => {
        return this.apiService.getEmployeeAddress(employeeId).pipe(
          tap(() => {
            this.loading$.next(false);
          }),
          map((address) => {
            return {
              firstName: employee.firstName,
              lastName: employee.lastName,
              streetAddress: address.streetAddress,
              city: address.city,
            };
          }),
          catchError((error) => {
            console.error('Error getting employee address:', error);
            this.loading$.next(false);
            this.error$.next('Error getting employee address.');
            return of(null);
          }),
        );
      }),
      catchError((error) => {
        console.error('Error getting employee:', error);
        this.loading$.next(false);
        this.error$.next('Error getting employee.');
        return of(null);
      }),
    );
  }
}
