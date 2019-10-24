import { Component, OnInit } from '@angular/core';
import { Account } from './../models/account';
import { User } from 'firebase';
import { AuthentificationService } from '../shared/auth/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: Account = {
      login: '',
      password: ''
  };
  user: User;

  constructor(
    private router: Router,
    private authService: AuthentificationService
  ) { }

  ngOnInit() { }


  login() {
    this.authService.login(this.credentials)
    .then(() => {
      this.router.navigate(['/dashboard']);
    })
    .catch(
      error => console.log(error.message)
    );
  }

}
