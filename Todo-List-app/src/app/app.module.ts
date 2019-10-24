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
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { DoneListComponent } from './done-list/done-list.component';
import { InProgressListComponent } from './in-progress-list/in-progress-list.component';
import { RegisterComponent } from './register/register.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthentificationService } from './shared/auth/authentification.service';
import { TaskListService } from './shared/task-list/task-list.service';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

// angular material
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      AddNewTaskComponent,
      DoneListComponent,
      InProgressListComponent,
      RegisterComponent,
      TaskDetailsComponent,
      TaskEditComponent,
      TodoListComponent,
      DashboardComponent,
      LoginComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule,
      BrowserAnimationsModule,
      MatButtonModule,
      AngularFireAuthModule,
      ReactiveFormsModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule
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
