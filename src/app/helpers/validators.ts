import { AbstractControl, FormControl } from '@angular/forms';
import { EMAIL_REGEX, NAME_REGEX, VIA_CEP_REGEX } from 'src/app/app.utils';

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('password').value;
        const confirmPassword = AC.get('confirmPassword').value;
        if (password != confirmPassword) {
            AC.get('confirmPassword').setErrors({ MatchPassword: true })
        } else {
            return null;
        }
    }

}


const validEmail = (email: string): boolean => {
    return (!email) ? true : EMAIL_REGEX.test(email);
};
const validName = (name: string): boolean => {
    return (!name) ? true : NAME_REGEX.test(name);
};
const validCep = (name: string): boolean => {
    return (!name) ? true : VIA_CEP_REGEX.test(name);
};

export function emailValidator(control: FormControl): { [key: string]: boolean } {
    return validEmail(control.value) ? null : { 'emailValidator': true };
}

export function nameValidator(control: FormControl): { [key: string]: boolean } {
    return validName(control.value) ? null : { 'nameValidator': true };
}

export function cepValidator(control: FormControl): { [key: string]: boolean } {
    return validCep(control.value) ? null : { 'cepValidator': true }
} 

