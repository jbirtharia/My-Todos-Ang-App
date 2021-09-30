import { Component, OnInit } from '@angular/core';
import { ChangePasswordDataService } from '../services/data/change-password-data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  username: string = "";
  password: string = "";
  confirmPassword: string = "";
  successMessage: string = "";
  errorMessage: string = "";
  confirmPasswordErrorMessage: string = "";

  constructor(private changePasswordDataService: ChangePasswordDataService) { }

  ngOnInit(): void {
  }

  public changePassword() {
    console.log("Going to change password");
    this.changePasswordDataService.changePasswordForUser(this.username, this.password, this.confirmPassword).subscribe(
      data => {
        // this.router.navigate(['login']);
        this.successMessage = "Password is changed sucessfully";
      },
      error => {
        this.errorMessage = "This User is not available."
      }
    )
  }

  public isConfirmPasswordSameAsPassword() {
    if (this.password != this.confirmPassword) {
      this.confirmPasswordErrorMessage = "Password and Confirm Password does not match";
    }
    else {
      this.confirmPasswordErrorMessage = "";
    }
  }

}
