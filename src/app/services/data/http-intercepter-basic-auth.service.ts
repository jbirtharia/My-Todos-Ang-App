import { HardcodedAuthenticationService } from './../hardcoded-authentication.service';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {

  constructor(private hardcodedAuthenticationService: HardcodedAuthenticationService) { }

  // It will intercept each request to backend server and add http basic authorization header into each request
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let token = this.hardcodedAuthenticationService.getAuthenticatedToken();
    let authenticatedUsername = this.hardcodedAuthenticationService.getAuthenticatedUser();
    console.log("Token : " + token);
    if (token && authenticatedUsername) {
      req = req.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }
    return next.handle(req);
  }
}
