import { Component, OnInit } from '@angular/core';
import { Account } from './../models/account';
import { User } from 'firebase';
import { AuthentificationService } from '../shared/auth/authentification.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  formGroup: FormGroup;
  titleAlert = 'To pole jest wymagane';
  post: any = '';

  // tslint:disable-next-line: max-line-length
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private router: Router,
    private authService: AuthentificationService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
     email : [null, [Validators.required, Validators.pattern(this.emailregex)]],
      password : [null, [Validators.required, this.checkPassword]]
    });
   }

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

  checkPassword(control) {
    const enteredPassword = control.value;
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Pole jest wymagane' :
      this.formGroup.get('email').hasError('pattern') ? 'Niepoprawny adres email' : '';
  }

  getErrorPassword() {
    // tslint:disable-next-line: max-line-length
    return this.formGroup.get('password').hasError('required') ? 'Pole jest wymagane (minimum 8 znaków, przynajmniej jedna wielka i mała litera)' :
      // tslint:disable-next-line: max-line-length
      this.formGroup.get('password').hasError('requirements') ? 'Hasło musi składać się z co najmniej ośmiu znaków, jednej dużej litery i jednej cyfry.' : '';
  }
}
