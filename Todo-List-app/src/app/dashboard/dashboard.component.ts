import { AddNewTaskPopupComponent } from './add-new-task-popup/add-new-task-popup.component';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(AddNewTaskPopupComponent, {
      width: '31.25rem',
    });
  }

}
