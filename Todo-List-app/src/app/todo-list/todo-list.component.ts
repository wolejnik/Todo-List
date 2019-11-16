import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { AngularFireAuth } from '@angular/fire/auth';
import { TaskListService } from '../shared/task-list/task-list.service';
import { User } from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { DeletePopupComponent } from '../in-progress-list/delete-popup/delete-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  user: User;
  todoTasks: Task[];
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
     this.toastr.error('Zadanie usunięte', 'Udało się!');
   }

   updateTaskToDone(taskID: string) {
     this.taskService.updateTaskToDone(taskID);
     this.toastr.success('Wykonałeś zdanie', 'Dobra robota!');
   }

   updateTaskToProgress(taskID: string) {
    this.taskService.updateTaskToProgress(taskID);
    this.toastr.warning('Zadanie w trakcie wykonywania', 'Powodzenia!');
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
