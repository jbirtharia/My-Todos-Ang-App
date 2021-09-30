import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { WelcomeMessage } from './welcome-message.model';
import { API_MAIN_URL } from 'src/app/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private httpRequest: HttpClient) { }

  public executeWelcomeMessageService() {
    // let basicHeaderString = this.createBasicAuthenticationHttpHeader();
    // let authHeaders = new HttpHeaders({
    //   Authorization: basicHeaderString
    // })
    // return this.httpRequest.get<WelcomeMessage>(`${API_MAIN_URL}/message`), { headers: authHeaders };
    return this.httpRequest.get<WelcomeMessage>(`${API_MAIN_URL}/message`);

  }

  public executeWelcomeMessageServiceWithUser(username: string) {
    // let basicHeaderString = this.createBasicAuthenticationHttpHeader();
    // let authHeaders = new HttpHeaders({
    //   Authorization: basicHeaderString
    // })
    // return this.httpRequest.get<WelcomeMessage>(`${API_MAIN_URL}/message/${username}`, { headers: authHeaders });
    return this.httpRequest.get<WelcomeMessage>(`${API_MAIN_URL}/message/${username}`);
  }

  // private createBasicAuthenticationHttpHeader(): string {
  //   let username = "jbirtharia@gmail.com";
  //   let password = "123";
  //   let basicAuthHeaderString = "Basic " + window.btoa(username + password);
  //   return basicAuthHeaderString;
  // }
}
