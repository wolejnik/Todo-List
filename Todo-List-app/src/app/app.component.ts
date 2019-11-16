import { Component } from '@angular/core';
import { AuthentificationService } from './shared/auth/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Todo-List-app';

  constructor(
    private authService: AuthentificationService
  ) {}

  logout() {
    this.authService.logout();
  }


}
