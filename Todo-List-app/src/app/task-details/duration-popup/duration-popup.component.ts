import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskListService } from 'src/app/shared/task-list/task-list.service';
import { Task } from 'src/app/models/task';
import { ToastrService } from 'ngx-toastr';

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
  save = false;

  constructor(
      private dialogRef: MatDialogRef<DurationPopupComponent>,
      private fireAuth: AngularFireAuth,
      private taskService: TaskListService,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private toastr: ToastrService
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
      if (!this.save) {
        this.toastr.warning('NIe zapisano czasu wykonywanego zadania.', 'Ostrzeżenie!');
      }
    }


    startTimer(timeCurrent: number) {
      this.toastr.success('Rozpoczęto wykonywanie zadania', 'Udało się!');
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
      }, 1000);
    }

    pauseTimer() {
      clearInterval(this.interval);
      this.save = true;
      this.toastr.success('Zapisano czas zadania.', 'Udało się!');
      this.saveTime();
    }

    saveTime() {
      this.taskService.updateDuration(this.idUrl, this.time);
    }
}
