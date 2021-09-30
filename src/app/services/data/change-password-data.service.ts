import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_MAIN_URL } from 'src/app/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordDataService {

  constructor(private httpRequest: HttpClient) { }

  public changePasswordForUser(username: string, password: string, confirmPassword: string) {
    return this.httpRequest.post<any>(`${API_MAIN_URL}/users/changePassword`, {
      username,
      password,
      confirmPassword
    })
  }
}
