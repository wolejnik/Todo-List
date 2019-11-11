import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskListService } from 'src/app/shared/task-list/task-list.service';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent implements OnInit {

  user: User;

  constructor(
      private dialogRef: MatDialogRef<DeletePopupComponent>,
      private fireAuth: AngularFireAuth,
      private firestore: AngularFirestore,
      private toastr: ToastrService,
      private taskService: TaskListService,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      this.fireAuth.authState.subscribe(user => {
        this.user = user;
      });
    }

  ngOnInit() { }

  closeDialog() {
    this.dialogRef.close();
  }

  onDelete(taskID: string) {
    this.taskService.deleteTask(taskID);
    this.toastr.error('You deleted task', 'Successful!');
    this.dialogRef.close();
  }

}
