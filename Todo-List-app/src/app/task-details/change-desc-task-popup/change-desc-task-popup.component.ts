import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskListService } from 'src/app/shared/task-list/task-list.service';


@Component({
  selector: 'app-change-desc-task-popup',
  templateUrl: './change-desc-task-popup.component.html',
  styleUrls: ['./change-desc-task-popup.component.scss']
})
export class ChangeDescTaskPopupComponent implements OnInit {

  user: User;
  descTask: string;

  constructor(
      private dialogRef: MatDialogRef<ChangeDescTaskPopupComponent>,
      private fireAuth: AngularFireAuth,
      private firestore: AngularFirestore,
      private taskService: TaskListService,
      private router: Router,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      this.fireAuth.authState.subscribe(user => {
        this.user = user;
      });
    }

    ngOnInit() {
      this.resetForm();
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
}
