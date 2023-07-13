export interface Employee {
  firstName: string;
  lastName: string;
  age: number;
}

export interface EmployeeAddress {
  streetAddress: string;
  city: string;
}

export interface TokenResponse {
  token: string;
}

export interface CombinedInfo {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
}
