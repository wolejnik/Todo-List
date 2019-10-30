import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { ActivatedRoute } from '@angular/router';
import { TaskListService } from '../shared/task-list/task-list.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  todoTasks: Task[];
  idUrl: string;
  selectedTask: Task;

  time = 0;
  tmpTime: number;
  day: number;
  hour: number;
  minutes: number;
  seconds: number;
  interval;
  start = true;


  constructor(
    private taskService: TaskListService,
    private route: ActivatedRoute
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

  startTimer(timeCurrent: number) {
    if (this.start) {
      this.time = timeCurrent;
      this.start = false;
    }
    this.interval = setInterval(() => {
    this.time++;
    this.tmpTime = this.time;
    this.day = Math.floor(this.tmpTime / (3600 * 24));
    this.tmpTime -= this.day * 3600 * 24;
    this.hour = Math.floor(this.tmpTime / 3600);
    this.tmpTime -= this.hour * 3600;
    this.minutes = Math.floor(this.tmpTime / 60);
    this.tmpTime -= this.minutes * 60;
    }, 100);
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.saveTime();
  }

  saveTime() {
    this.taskService.updateDuration(this.idUrl, this.time);
  }

}
