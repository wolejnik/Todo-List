import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskListService } from '../shared/task-list/task-list.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-done-list',
  templateUrl: './done-list.component.html',
  styleUrls: ['./done-list.component.scss']
})
export class DoneListComponent implements OnInit {

  doneTasks: Task[];
  user: User;

  constructor(
    private taskService: TaskListService,
    private fireAuth: AngularFireAuth,
    private toastr: ToastrService
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
      this.doneTasks = t.map(item => {
        return {
          taskID: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Task;
      });
    });
  }

  onDelete(taskID: string) {
    this.taskService.deleteTask(taskID);
    this.toastr.error('Usunięto zadanie.', 'Udało się!');
  }

}
