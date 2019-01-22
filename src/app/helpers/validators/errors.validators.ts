import { ValidationErrors, FormGroup } from '@angular/forms';
import { EventHandler } from 'src/app/services/handler/event-handler.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormValidatorErrors {

    constructor(private eventHandler: EventHandler) { }

    public getFormValidationErrors(form: FormGroup): any[] {

        const validations = [];

        if (form.pristine) {
            validations.push({ status: 1, msg: 'Preencha o Formulário' });
        } else {

            Object.keys(form.controls).forEach(key => {

                const controlErrors: ValidationErrors = form.get(key).errors;

                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        const error = { status: 1, key, keyError, msg: this.validationMessages(key, keyError) };
                        validations.push(error);
                    });
                }
            });
        }

        if (validations.length > 0) this.eventHandler.handle(validations[0]);

        return validations;
    }

    private validationMessages(key, error): string {

        switch (error) {
            case 'required': return `O campo '${this.fieldTranslate(key)}' é obrigatório.`;
            case 'nameValidator': return `Digite um ${this.fieldTranslate(key)} válido.`;
            case 'emailValidator': return `Digite um ${this.fieldTranslate(key)} válido.`;
        }

    }

    private fieldTranslate(field): string {

        switch (field) {
            case 'name': return `nome`;
            case 'email': return `email`;
            case 'childrens_number': return `número de filhos`;
            case 'street': return `rua`;
            case 'number': return `número`;
            case 'zip_code': return `CEP`;
            case 'district': return `distrito`;
            case 'city': return `cidade`;
            case 'phone': return `fone`;
            case 'union_time': return `tempo de união`
        }
    }


}    
