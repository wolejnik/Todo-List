import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

constructor(
  private firestore: AngularFirestore
) { }

getTasks() {
  return this.firestore.collection('Tasks').snapshotChanges();
}

getCurrentTime(id: string) {
  // this.firestore.doc('Tasks/' + id + '/duration').get();
}

deleteTask(id: string) {
  this.firestore.doc('Tasks/' + id).delete();
}

updateTaskToDone(id: string) {
  this.firestore.doc('Tasks/' + id).update({isToDo: false, isProgress: false, isDone: true, dataEnd: new Date().toLocaleString() });
}

updateTaskToProgress(id: string) {
  this.firestore.doc('Tasks/' + id).update({isToDo: false, isProgress: true, isDone: false });
}

updateTaskToToDo(id: string) {
  this.firestore.doc('Tasks/' + id).update({isToDo: true, isProgress: false, isDone: false });
}

updateTaskDesc(id: string, descNew: string) {
  this.firestore.doc('Tasks/' + id).update({desc: descNew });
}


updateDuration(id: string, time: number) {
  this.firestore.doc('Tasks/' + id).update({duration: time });
}

}
