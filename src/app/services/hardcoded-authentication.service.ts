import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationBean } from './data/authentication-bean.model';
import { map } from "rxjs/operators";
import { API_MAIN_URL } from '../constants/app.constants';

export const TOKEN = "token";
export const AUTHENTICATED_USER = "authenticatedUser";

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor(private httpRequest: HttpClient) { }

  public executeJWTAuthenticationService(username: string, password: string) {

    return this.httpRequest.post<any>(`${API_MAIN_URL}/authenticate`, {
      username,
      password
    }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return;
        }
      )
    );
  }

  public executeBasicAuthenticationService(username: string, password: string) {

    let basicAuthHeaderString = "Basic " + btoa(username + ":" + password);
    let authHeaders = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    return this.httpRequest.get<AuthenticationBean>(`${API_MAIN_URL}/basic-auth`, { headers: authHeaders }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return;
        }
      )
    );
  }

  public getAuthenticatedUser(): any {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  public getAuthenticatedToken(): any {
    if (this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN);
  }

  public isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user == null);
  }

  public logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

  public authenticateUser(username: string, password: string): boolean {
    console.log("Username : " + username);
    if (username === "jbirtharia@gmail.com" && password === "123") {
      sessionStorage.setItem(AUTHENTICATED_USER, username);
      return true;
    }
    else {
      return false;
    }
  }
}
