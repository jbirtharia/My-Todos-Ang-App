import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserComponent } from './user/user.component';
import { TodoComponent } from './todo/todo.component';
import { RouteGuardService } from './services/route-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTodosComponent } from './list-todos/list-todos.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: LoginComponent },
  { path: "welcome/:name", component: WelcomeComponent, canActivate: [RouteGuardService] },     // Can activate or deactivate using RouteGuardService
  { path: "todos", component: ListTodosComponent, canActivate: [RouteGuardService] },
  { path: "logout", component: LogoutComponent, canActivate: [RouteGuardService] },
  { path: "todos/:id", component: TodoComponent, canActivate: [RouteGuardService] },
  { path: "newUser", component: UserComponent },
  { path: "changePassword", component: ChangePasswordComponent },
  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
