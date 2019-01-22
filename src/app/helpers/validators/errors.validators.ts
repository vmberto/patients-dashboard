import { ValidationErrors, FormGroup } from '@angular/forms';

export function getFormValidationErrors(form: FormGroup): any[] {

    if (form.pristine) return [{message: 'Preencha o Formulário'}];

    const validations = [];

    Object.keys(form.controls).forEach(key => {

        const controlErrors: ValidationErrors = form.get(key).errors;

        if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
                const error = { key, keyError, message:  validationMessages(key, keyError)};
                validations.push(error);
            });
        }
    });

    return validations;
}

function validationMessages(key, error): string {

    switch (error) {
        case 'required': return `O campo '${fieldTranslate(key)}' é obrigatório.`;
        case 'nameValidator': return `Digite um ${fieldTranslate(key)} válido.`;
        case 'emailValidator': return `Digite um ${fieldTranslate(key)} válido.`;
    }

}

function fieldTranslate(field): string {

    switch (field) {
        case 'name':             return `nome`;
        case 'email':            return `email`;
        case 'childrens_number': return `número de filhos`;
        case 'street':           return `rua`;
        case 'number':           return `número`;
        case 'zip_code':         return `CEP`;
        case 'district':         return `distrito`;
        case 'city':             return `cidade`;
        case 'phone':            return `fone`;
    }
}

