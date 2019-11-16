import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';

// firebase
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HomeComponent } from './home/home.component';
import { DoneListComponent } from './done-list/done-list.component';
import { InProgressListComponent } from './in-progress-list/in-progress-list.component';
import { RegisterComponent } from './register/register.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthentificationService } from './shared/auth/authentification.service';
import { TaskListService } from './shared/task-list/task-list.service';
import { AddNewTaskPopupComponent } from './dashboard/add-new-task-popup/add-new-task-popup.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrModule } from 'ngx-toastr';

// angular material
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { ChangeDescTaskPopupComponent } from './task-details/change-desc-task-popup/change-desc-task-popup.component';
import { DaysHoursMinutesSeconds } from './pipes/DaysHoursMinutesSeconds.pipe';
import { DurationPopupComponent } from './task-details/duration-popup/duration-popup.component';
import { DeletePopupComponent } from './in-progress-list/delete-popup/delete-popup.component';
import { DurationSummaryComponent } from './duration-summary/duration-summary.component';
import { TaskDetailsTodoComponent } from './task-details-todo/task-details-todo.component';
import { TaskDetailsDoneComponent } from './task-details-done/task-details-done.component';



@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      DoneListComponent,
      InProgressListComponent,
      RegisterComponent,
      TaskDetailsComponent,
      TodoListComponent,
      DashboardComponent,
      LoginComponent,
      AddNewTaskPopupComponent,
      ChangeDescTaskPopupComponent,
      DaysHoursMinutesSeconds,
      DurationPopupComponent,
      DeletePopupComponent,
      DurationSummaryComponent,
      TaskDetailsTodoComponent,
      TaskDetailsDoneComponent
    ],
    entryComponents: [
      AddNewTaskPopupComponent,
      ChangeDescTaskPopupComponent,
      DurationPopupComponent,
      DeletePopupComponent
    ],
   imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatRadioModule,
      AngularFireAuthModule,
      ReactiveFormsModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule,
      ToastrModule.forRoot({
         positionClass: 'toast-bottom-right'
      })
   ],
   providers: [
    AuthentificationService,
    TaskListService,
    AngularFirestore
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
