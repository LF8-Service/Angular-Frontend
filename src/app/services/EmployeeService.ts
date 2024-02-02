import {Component, Injectable, OnInit} from '@angular/core';
import {catchError, map, Observable, of, Subscription, tap, throwError} from "rxjs";
import {HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Employee} from "../model/Employee";
import {AuthenticationService} from "./AuthenticationService";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService{
  private baseUrl = 'https://employee.szut.dev/employees';
  bearer = '';

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.bearer = this.authService.getAccessToken();
  }


  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }


}
