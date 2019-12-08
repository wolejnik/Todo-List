import { Component } from '@angular/core';
import { AuthentificationService } from './shared/auth/authentification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Todo-List-app';

  constructor(
    private authService: AuthentificationService,
    private toastr: ToastrService

  ) {}

  logout() {
    this.authService.logout().then(() => {
      this.toastr.success('Wylogowano się pomyślnie!');
    });
  }
}