import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskListService } from '../shared/task-list/task-list.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-done-list',
  templateUrl: './done-list.component.html',
  styleUrls: ['./done-list.component.scss']
})
export class DoneListComponent implements OnInit {

  todoTasks: Task[];
  user: User;

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

  updateTaskToProgress(taskID: string) {
    this.taskService.updateTaskToProgress(taskID);
  }

}
