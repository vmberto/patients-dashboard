import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from '../../components/generic-components/toast';

@Injectable({
  providedIn: 'root'
})
export class EventHandler {
  private auth: AuthService;
      
  private otherCodes = {
    'FORM_VALIDATOR_EVENT': 1
  };


  constructor(private authService: AuthService, private toastService: ToastService) {
    this.auth = this.authService;
  }

  /**
   *
   * @param {any} event
   */
  private handleFailed(event: any): void {
    this.toastService.show({ text: event.msg || 'Ocorreu um erro', type: 'danger' });
  }

  /**
 * 1- If the first key in the response JSON starts with 'new', shows a toast to inform that the object was created.
 * 2- If there is an key called error and has a message (msg), shows a toast to inform the error message.
 * 3- If the event is a download, shows a toast to inform that the download was realized.
 * 
 * @param {any} event
 */
  private handle200(event: any): void {

    if (typeof Object.keys(event.body)[0] === 'string' && Object.keys(event.body)[0].substr(0, 3) === 'new') {
      this.toastService.show({ text: 'Criado com sucesso!', type: 'success' });
    } else if (typeof Object.keys(event.body)[0] === 'string' && Object.keys(event.body)[0].substr(0, 6) === 'edited') {
      this.toastService.show({ text: 'Atualizado com sucesso!', type: 'success' });
    } else if (event.body.error && event.body.msg) {
      this.toastService.show({ text: event.body.msg, type: 'warning' });
    } else if (event.body instanceof Blob) {
      this.toastService.show({ text: 'Download com sucesso!', type: 'success'})
    }
    

  }


  /**
   *
   * @param {any} event
   */
  private handle400(event: any): void {
    this.toastService.show({ text: event.error.msg || 'Ocorreu um erro', type: 'danger' });
  }


  /**
   *
   * @param {any} event
   */
  private handle401(event: any): void {

    if (this.auth.isLoggedIn()) {
      this.auth.logout();
    } else {
      this.toastService.show({ text: event.error[0].msg || event.error.msg, type: 'warning' });
    }

  }


  /**
   *
   * @param {any} event
   */
  private handle422(event: any): void {
    this.toastService.show({ text: event.error.msg || 'Ocorreu um erro', type: 'warning' });
  }


  /**
   *
   * @param {any} event
   */
  private handle500(event: any): void {
    this.toastService.show({ text: event.error.msg || 'Estamos com problemas internos', type: 'danger' });
  }

  /**
 *
 * @param {any} event
 */
  private handleValidationEvent(event: any): void {
    this.toastService.show({ text: event.msg || 'Erro de Validação', type: 'warning' });
  }


  /**
   *
   * @param event
   */
  public handle(event: any): void {

    switch (event.status) {
      case 0:
        this.handleFailed(event);
        return;

      case 200:
        this.handle200(event);
        return;

      case 400:
        this.handle400(event);
        return;

      case 401:
        this.handle401(event);
        return;

      case 422:
        this.handle422(event);
        return;

      case 500:
        this.handle500(event);
        return;

      case this.otherCodes.FORM_VALIDATOR_EVENT:
        this.handleValidationEvent(event);
        return;
    }
  }


}
