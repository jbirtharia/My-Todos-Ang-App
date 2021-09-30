import { HardcodedAuthenticationService } from './../services/hardcoded-authentication.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "jbirtharia@gmail.com";
  password: string = "";
  isValidUser: boolean = false;
  closeResult: string = "";

  @ViewChild('uname')
  inputElement: ElementRef = {} as ElementRef;

  // Creating instance of Router through dependency injection
  constructor(private modalService: NgbModal, private router: Router, private authenticationService: HardcodedAuthenticationService) {
    console.log("Login component is initialised");

  }

  ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.inputElement.nativeElement.focus();
    // this.inputElement.nativeElement.value = this.username;
  }

  public handleJWTAuthLogin(content: any) {

    this.authenticationService.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data);
          this.isValidUser = true;
          // Redirecting to welcome page
          this.router.navigate(["welcome", this.username]);
        },
        error => {
          console.error(error);
          this.isValidUser = false;
          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        }
      )
  }

  public handleBasicAuthLogin(content: any) {

    this.authenticationService.executeBasicAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data);
          this.isValidUser = true;
          // Redirecting to welcome page
          this.router.navigate(["welcome", this.username]);
        },
        error => {
          console.error(error);
          this.isValidUser = false;
          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        }
      )
  }

  public handleLogin(content: any) {

    if (this.authenticationService.authenticateUser(this.username, this.password)) {
      this.isValidUser = true;
      // Redirecting to welcome page
      this.router.navigate(["welcome", this.username]);
    }
    else {
      this.isValidUser = false;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
