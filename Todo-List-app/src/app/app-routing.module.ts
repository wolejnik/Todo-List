import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { DurationSummaryComponent } from './duration-summary/duration-summary.component';
import { TaskDetailsTodoComponent } from './task-details-todo/task-details-todo.component';
import { TaskDetailsDoneComponent } from './task-details-done/task-details-done.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'todoList',
    component: TodoListComponent
  },
  {
    path: 'task/:id',
    component: TaskDetailsComponent
  },
  {
    path: 'tasktodo/:id',
    component: TaskDetailsTodoComponent
  },
  {
    path: 'taskdone/:id',
    component: TaskDetailsDoneComponent
  },
  {
    path: 'summary',
    component: DurationSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
