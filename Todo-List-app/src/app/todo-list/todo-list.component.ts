import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { AngularFireAuth } from '@angular/fire/auth';
import { TaskListService } from '../shared/task-list/task-list.service';
import { User } from 'firebase';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  user: User;
  todoTasks: Task[];

  constructor(
    private taskService: TaskListService,
    private fireAuth: AngularFireAuth
  ) {
    this.fireAuth.authState.subscribe(user => {
      this.user = user;
    });
   }

  ngOnInit() {
    this.init();
   }

   async init() {
    await this.taskService.getTasks().subscribe(t => {
      this.todoTasks = t.map(item => {
        return {
          taskID: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Task;
      });
    });
   }

   onDelete(taskID: string) {
     this.taskService.deleteTask(taskID);
   }

   updateTaskToDone(taskID: string) {
     this.taskService.updateTaskToDone(taskID);
   }

   updateTaskToProgress(taskID: string) {
    this.taskService.updateTaskToProgress(taskID);
  }

}
