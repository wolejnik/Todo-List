import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { TaskListService } from 'src/app/shared/task-list/task-list.service';
import { ToastrService } from 'ngx-toastr';


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
      private taskService: TaskListService,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private toastr: ToastrService
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
      this.toastr.success('Xmieniono opis zadania', 'Udało się!');
      this.dialogRef.close();
    }

    resetForm(addNewTaskForm?: NgForm) {
      if (addNewTaskForm != null) {
        addNewTaskForm.resetForm();
      }
    }
}
