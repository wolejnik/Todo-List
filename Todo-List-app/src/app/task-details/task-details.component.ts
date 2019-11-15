import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaskListService } from '../shared/task-list/task-list.service';
import { ChangeDescTaskPopupComponent } from './change-desc-task-popup/change-desc-task-popup.component';
import { DurationPopupComponent } from './duration-popup/duration-popup.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  todoTasks: Task[];
  idUrl: string;
  selectedTask: Task;

  constructor(
    private taskService: TaskListService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.init();
    this.idUrl = String(this.route.snapshot.paramMap.get('id'));
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

  onSelect(t: Task): void {
    this.selectedTask = t;
  }

  openDialog(id: number, desc: string) {
    this.dialog.open(ChangeDescTaskPopupComponent, {
      width: '31.25rem',
      data: {
        idTask: id,
        descTask: desc
       }
    });
  }

  openDialog2(id: number, duration: number, desc: string) {
    this.dialog.open(DurationPopupComponent, {
      width: '31.25rem',
      data: {
        idTask: id,
        timeTask: duration,
        descTask: desc
       }
    });
  }

}
