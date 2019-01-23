import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from '../../components/generic-components/toast';

@Injectable({
  providedIn: 'root'
})
export class EventHandler {
  private auth: AuthService;


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
 *
 * @param {any} event
 */
  private handle200(event: any): void {
    if (typeof Object.keys(event.body)[0] === 'string' && Object.keys(event.body)[0].substr(0, 3) === 'new') {
      this.toastService.show({ text: 'Criado com sucesso!', type: 'success' });
    }
  }



  /**
   *
   * @param {any} event
   */
  private handle400(event: any): void {
    this.toastService.show({ text: event.msg || 'Ocorreu um erro', type: 'danger' });
  }


  /**
   *
   * @param {any} event
   */
  private handle401(event: any): void {

    if (this.auth.isLoggedIn()) {
      this.auth.logout();
    } else {
      this.toastService.show({ text: event.error[0].msg, type: 'warning' });
    }

  }


  /**
   *
   * @param {any} event
   */
  private handle422(event: any): void {
    this.toastService.show({ text: event.msg || 'Ocorreu um erro', type: 'danger' });
  }


  /**
   *
   * @param {any} event
   */
  private handle500(event: any): void {
    this.toastService.show({ text: event.msg || 'Ocorreu um erro interno', type: 'danger' });
  }

  /**
 *
 * @param {any} event
 */
  private handleValidationevent(event: any): void {
    this.toastService.show({ text: event.msg || 'Erro de Validação', type: 'warning' });
  }


  /**
   *
   * @param event
   */
  public handle(event: any): void {

    const otherCodes = {
      'FORM_VALIDATOR_event': 1
    };


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

      case otherCodes.FORM_VALIDATOR_event:
        this.handleValidationevent(event);
        return;
    }
  }


}
