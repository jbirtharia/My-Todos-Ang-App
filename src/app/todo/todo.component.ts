import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from './../list-todos/todo.model';
import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../services/data/todo-data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AUTHENTICATED_USER } from '../services/hardcoded-authentication.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number = 0;
  todo: Todo = {} as Todo;
  closeResult: string = "";

  constructor(private todoDataService: TodoDataService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, "", false, new Date());
    let user = sessionStorage.getItem(AUTHENTICATED_USER);

    if (this.todo.id != -1) {
      this.todoDataService.retrieveTodo(user, this.id).subscribe(
        data => this.todo = data
      );
    }
  }

  saveTodo(content: any) {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    if (this.id == -1) {
      // Create todo
      this.todoDataService.saveTodo(user, this.todo).subscribe(
        data => {
          this.router.navigate(["todos"]);
        },
        error => {
          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        }
      );
    }
    else {
      // Update todo
      this.todoDataService.updateTodo(user, this.todo).subscribe(
        data => {
          this.router.navigate(["todos"]);
        },
        error => {
          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        }
      );
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
