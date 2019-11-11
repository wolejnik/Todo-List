import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { TaskListService } from '../shared/task-list/task-list.service';
import { User } from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';

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
    private fireAuth: AngularFireAuth,
    private toastr: ToastrService,
    public dialog: MatDialog,

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

  updateTaskToDone(taskID: string) {
    this.taskService.updateTaskToDone(taskID);
    this.toastr.success('Done task', 'Good job!');

  }

  updateTaskToToDo(taskID: string) {
    this.taskService.updateTaskToToDo(taskID);
    this.toastr.warning('the task awaits completion', 'Successful!');
  }

  onSelect(t: Task): void {
    this.selectedTask = t;
  }

  openDialog(id: number) {
    console.log(id);
    this.dialog.open(DeletePopupComponent, {
      width: '31.25rem',
      data: {
        idTask: id
      }
    });
  }

}
