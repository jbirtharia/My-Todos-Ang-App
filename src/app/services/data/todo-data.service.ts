import { Todo } from './../../list-todos/todo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_MAIN_URL } from 'src/app/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private httpRequest: HttpClient) { }

  public retrieveAllTodos(username: string | null) {
    return this.httpRequest.get<Todo[]>(`${API_MAIN_URL}/users/${username}/todos`);
  }

  public retrieveTodo(username: string | null, id: number) {
    return this.httpRequest.get<Todo>(`${API_MAIN_URL}/users/${username}/todos/${id}`);
  }

  public deleteTodo(username: string | null, id: number) {
    return this.httpRequest.delete(`${API_MAIN_URL}/users/${username}/todos/${id}`);
  }

  public updateTodo(username: string | null, todo: Todo) {
    return this.httpRequest.put(`${API_MAIN_URL}/users/${username}/todos`, todo);
  }

  public saveTodo(username: string | null, todo: Todo) {
    return this.httpRequest.post(`${API_MAIN_URL}/users/${username}/todos`, todo);
  }

}
