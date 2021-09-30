import { WelcomeMessage } from './../services/data/welcome-message.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../services/data/welcome-data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  username: string;
  welcomeMessage: string = "";
  errorMessage: string = "";
  closeResult: string = "";

  // Creating instance of ActivatedRoute to accept uri paramters
  constructor(private route: ActivatedRoute, private welcomeService: WelcomeDataService, private modalService: NgbModal) {
    this.username = this.route.snapshot.params['name']
  }

  ngOnInit(): void {
    console.log("Logged in user : " + this.username);
    this.getWelcomeMessageWithUsername(this.username);
  }

  public getWelcomeMessage(content: any) {
    this.welcomeService.executeWelcomeMessageService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error, content)
    );
  }

  private handleSuccessfulResponse(response: WelcomeMessage) {
    this.welcomeMessage = response.message;
  }

  private handleErrorResponse(error: any, content: any) {
    this.errorMessage = error.error.message;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  public getWelcomeMessageWithUsername(name: string) {
    this.welcomeService.executeWelcomeMessageServiceWithUser(name).subscribe(
      response => this.handleSuccessfulResponse(response)
    );
  }

}
