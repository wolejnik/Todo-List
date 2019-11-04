import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { AngularFireAuth } from '@angular/fire/auth';
import { TaskListService } from '../shared/task-list/task-list.service';
import { User } from 'firebase';

@Component({
  selector: 'app-in-progress-list',
  templateUrl: './in-progress-list.component.html',
  styleUrls: ['./in-progress-list.component.scss']
})
export class InProgressListComponent implements OnInit {

  inProgressTasks: Task[];
  user: User;

  selectedTask: Task;

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
      this.inProgressTasks = t.map(item => {
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

  updateTaskToToDo(taskID: string) {
    this.taskService.updateTaskToToDo(taskID);
  }

  onSelect(t: Task): void {
    this.selectedTask = t;
  }

}
