import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.scss']
})
export class AddNewTaskComponent implements OnInit {

  user: User;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.fireAuth.authState.subscribe(user => {
      this.user = user;
    });
   }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(addNewTaskForm: NgForm) {
    this.firestore.collection('Tasks').add({
      userID: this.user.uid,
      desc: addNewTaskForm.controls.task.value,
      dataCreated: new Date().toLocaleString(),
      dataEnd: 0,
      duration: 0,
      isToDo: true,
      isProgress: false,
      isDone: false,
    });
    this.resetForm(addNewTaskForm);
  }

  resetForm(addNewTaskForm?: NgForm) {
    if (addNewTaskForm != null) {
      addNewTaskForm.resetForm();
    }
  }

}
