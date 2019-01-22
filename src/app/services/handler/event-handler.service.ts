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
   * @param {any} error
   */
  private handleFailed(error: any): void {
    this.toastService.show({ text: error.msg || 'Ocorreu um erro', type: 'danger' });
  }


  /**
   *
   * @param {any} error
   */
  private handle400(error: any): void {
    this.toastService.show({ text: error.msg || 'Ocorreu um erro', type: 'danger' });
  }


  /**
   *
   * @param {any} error
   */
  private handle401(error: any): void {

    if (this.auth.isLoggedIn()) {
      this.auth.logout();
    } else {
      this.toastService.show({ text: error.error[0].msg, type: 'warning' });
    }

  }


  /**
   *
   * @param {any} error
   */
  private handle422(error: any): void {
    this.toastService.show({ text: error.msg || 'Ocorreu um erro', type: 'danger' });
  }


  /**
   *
   * @param {any} error
   */
  private handle500(error: any): void {
    this.toastService.show({ text: error.msg || 'Ocorreu um erro interno', type: 'danger' });
  }

  /**
 *
 * @param {any} error
 */
  private handleValidationError(error: any): void {
    this.toastService.show({ text: error.msg || 'Erro de Validação', type: 'warning' });
  }


  /**
   *
   * @param event
   */
  public handle(event: any): void {

    const otherCodes = {
      'FORM_VALIDATOR_ERROR': 1
    };

    switch (event.status) {
      case 0:
        this.handleFailed(event);
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

      case otherCodes.FORM_VALIDATOR_ERROR:
        this.handleValidationError(event);
        return;
    }
  }


}
