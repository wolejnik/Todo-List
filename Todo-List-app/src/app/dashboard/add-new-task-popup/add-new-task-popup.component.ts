import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-task-popup',
  templateUrl: './add-new-task-popup.component.html',
  styleUrls: ['./add-new-task-popup.component.scss']
})
export class AddNewTaskPopupComponent implements OnInit {

  user: User;
  category: string;
  categories: string[] = ['Egzamin', 'Projekt', 'Obowiązki domowe', 'Pozostałe zadania'];

  constructor(
      private dialogRef: MatDialogRef<AddNewTaskPopupComponent>,
      private fireAuth: AngularFireAuth,
      private firestore: AngularFirestore,
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
      this.firestore.collection('Tasks').add({
        userID: this.user.uid,
        desc: addNewTaskForm.controls.task.value,
        category: this.category,
        dataCreated: new Date().toLocaleString(),
        dataEnd: 0,
        duration: 0,
        isToDo: true,
        isProgress: false,
        isDone: false,
      });
      console.log(this.category);
      this.resetForm(addNewTaskForm);
      this.toastr.success('Dodałeś zdanie do wykonania.', 'Udało się!');
      this.dialogRef.close();
    }

    resetForm(addNewTaskForm?: NgForm) {
      if (addNewTaskForm != null) {
        addNewTaskForm.resetForm();
      }
    }
  }
