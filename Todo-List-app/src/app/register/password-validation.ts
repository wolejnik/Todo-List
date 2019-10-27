import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('password').value;
        if(AC.get('confirmPassword').touched || AC.get('confirmPassword').dirty) {
          const verifyPassword = AC.get('confirmPassword').value;

          if (password !== verifyPassword) {
                AC.get('confirmPassword').setErrors( {MatchPassword: true} );
            } else {
                return null;
            }
        }
    }
}
