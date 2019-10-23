import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Account } from '../../models/account';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

user: User;

constructor(
  private fireAuth: AngularFireAuth,
  private router: Router) {
 }

login({login, password}: Account) {
  return this.fireAuth.auth.signInWithEmailAndPassword(login, password);
}

register({login, password}: Account) {
  return this.fireAuth.auth.createUserWithEmailAndPassword(login, password);
}

logout() {
  this.router.navigate(['/']);
  return this.fireAuth.auth.signOut();
}

}
