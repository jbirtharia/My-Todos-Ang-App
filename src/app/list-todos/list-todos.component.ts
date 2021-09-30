import { Router } from '@angular/router';
import { Todo } from './todo.model';
import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../services/data/todo-data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AUTHENTICATED_USER } from '../services/hardcoded-authentication.service';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  // todo: Todo;
  todos: any;
  deleteMessage: string = "";
  closeResult: string = "";

  constructor(private todoDataService: TodoDataService, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.refreshTodos();
  }

  public deleteTodo(id: number, description: string, content: any) {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    this.todoDataService.deleteTodo(user, id).subscribe(
      response => {
        console.log(response);
        this.deleteMessage = `Todo : ${description} is deleted!!`;
        this.refreshTodos();
      },
      error => {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
    )
  }

  public updateTodo(id: number, description: string) {
    this.router.navigate(['todos', id]);
  }

  public addTodo() {
    this.router.navigate(['todos', -1]);
  }

  private refreshTodos(): void {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    this.todoDataService.retrieveAllTodos(user).subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
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
