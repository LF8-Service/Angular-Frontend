import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Qualification} from "../model/Qualification";
import {AuthenticationService} from "./AuthenticationService";

@Injectable({
  providedIn: 'root'
})
export class QualificationService {
  private baseUrl = 'https://employee.szut.dev/qualifications';
  bearer = '';

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.bearer = this.authService.getAccessToken();
  }

  getAllQualifications(): Observable<Qualification[]> {
    return this.http.get<Qualification[]>(`${this.baseUrl}`,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

  getQualificationById(id: number): Observable<Qualification> {
    return this.http.get<Qualification>(`${this.baseUrl}/${id}`,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

  createQualification(qualification: Qualification): Observable<Qualification> {
    return this.http.post<Qualification>(this.baseUrl, qualification,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

  updateQualification(id: number, qualification: Qualification): Observable<Qualification> {
    return this.http.put<Qualification>(`${this.baseUrl}/${id}`, qualification,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

  deleteQualification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }
}
