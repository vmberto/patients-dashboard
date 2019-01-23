import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EventHandler } from 'src/app/services/handler/event-handler.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, private eventHandler: EventHandler) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.getToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
    }

    return next.handle(request).pipe(tap(
    (event: HttpEvent<any>) => {

      if (event instanceof HttpResponse) {

        if (event.body && event.body.error) {
          throw(event);
        }

        this.eventHandler.handle(event);

      }

    },
    (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.eventHandler.handle(error);
      }
    }));
  }
}
