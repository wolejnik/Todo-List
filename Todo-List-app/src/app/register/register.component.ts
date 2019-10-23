import { Component, OnInit } from '@angular/core';
import { Account } from './../models/account';
import { User } from 'firebase';
import { AuthentificationService } from '../shared/auth/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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

  register() {
    this.authService.register(this.credentials)
    .then( () => {
      console.log('Created account');
      this.router.navigate(['/login']);
    })
    .catch(
      error => console.log(error.message)
    );
  }

}
