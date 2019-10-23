import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskListService } from '../shared/task-list/task-list.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

  idUrl: string;
  todoTasks: Task[];

  constructor(
    private taskService: TaskListService,
    private route: ActivatedRoute,
    private router: Router
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

  onSubmit(taskForm: NgForm) {
    this.taskService.updateTaskDesc(this.idUrl, taskForm.value.desc);
    this.router.navigate(['/dashboard']);
  }

}
