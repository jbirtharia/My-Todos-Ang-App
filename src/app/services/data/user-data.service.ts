import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_MAIN_URL } from 'src/app/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private httpRequest: HttpClient) { }

  public createUser(username: string, password: string) {
    return this.httpRequest.post<any>(`${API_MAIN_URL}/users`, {
      username,
      password
    })
  }

  public checkDuplicateUsername(username: string) {
    return this.httpRequest.get<any>(`${API_MAIN_URL}/users/${username}`)
  }
}
