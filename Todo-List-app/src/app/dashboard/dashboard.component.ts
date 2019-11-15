import { AddNewTaskPopupComponent } from './add-new-task-popup/add-new-task-popup.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(AddNewTaskPopupComponent, {
      width: '31.25rem',
    });
  }

  openSummary() {
    this.router.navigate(['/summary']);
  }

}
