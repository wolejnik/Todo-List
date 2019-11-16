import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaskListService } from '../shared/task-list/task-list.service';

@Component({
  selector: 'app-task-details-done',
  templateUrl: './task-details-done.component.html',
  styleUrls: ['./task-details-done.component.scss']
})
export class TaskDetailsDoneComponent implements OnInit {

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

}
