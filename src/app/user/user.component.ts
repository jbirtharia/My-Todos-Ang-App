import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/data/user-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username: string = "";
  password: string = "";
  successMessage = "";
  errorMessage = "";
  userErrorMessage = "";

  constructor(private userDataService: UserDataService, private router: Router,) { }

  ngOnInit(): void {
  }

  public createNewUser() {
    this.userDataService.createUser(this.username, this.password).subscribe(
      data => {
        // this.router.navigate(['login']);
        this.successMessage = "User is Created Succesfully";
      },
      error => {
        this.errorMessage = "This username is not available."
      }
    )
  }

  public checkIfUsernameIsAlreadyPresent() {
    if (this.username.length > 0) {
      this.userDataService.checkDuplicateUsername(this.username).subscribe(
        data => {
          this.userErrorMessage = "";
        },
        error => {
          this.userErrorMessage = "This username is not available."
        }
      )
    }
  }
}
