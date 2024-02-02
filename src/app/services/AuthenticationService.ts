import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}


  public token = '';
  public async login(username: string, password: string) {
      const url = "https://keycloak.szut.dev/auth/realms/szut/protocol/openid-connect/token";
      const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
      const requestBody = `grant_type=password&client_id=employee-management-service&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

      try {
          const responseData: any = await this.http.post(url, requestBody, {headers}).toPromise();
          if (responseData.access_token) {
              this.token = responseData.access_token; // Сохранение токена
              return responseData.access_token;
          } else {
              console.log('Access token not found');
              return null;
          }
      } catch (error) {
          console.error('Login error:', error);
          return null;
      }
  }

  public getAccessToken(){
    return this.token;
  }

}
