import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TaskListService } from 'src/app/shared/task-list/task-list.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-duration-popup',
  templateUrl: './duration-popup.component.html',
  styleUrls: ['./duration-popup.component.scss']
})
export class DurationPopupComponent implements OnInit {

  user: User;
  descTask: string;
  todoTasks: Task[];
  idUrl: string;

  //
  time = 0;
  tmpTime: number;
  day: number;
  hour: number;
  minutes: number;
  seconds: number;
  interval;
  start = true;

  constructor(
      private dialogRef: MatDialogRef<DurationPopupComponent>,
      private fireAuth: AngularFireAuth,
      private firestore: AngularFirestore,
      private taskService: TaskListService,
      private router: Router,
      private route: ActivatedRoute,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      this.fireAuth.authState.subscribe(user => {
        this.user = user;
      });
    }

    ngOnInit() {
      this.init();
      this.idUrl = this.data.idTask;
      console.log(this.idUrl);
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

    closeDialog() {
      this.dialogRef.close();
    }

    onSubmit(addNewTaskForm: NgForm) {
      this.taskService.updateTaskDesc(this.data.idTask, addNewTaskForm.controls.task.value);
      this.resetForm(addNewTaskForm);
      this.dialogRef.close();
    }

    resetForm(addNewTaskForm?: NgForm) {
      if (addNewTaskForm != null) {
        addNewTaskForm.resetForm();
      }
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
