import {Injectable} from '@angular/core';
import {HttpHandler, HttpRequest, HttpInterceptor, HttpEvent, HttpResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/internal/operators';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorErrorService {

  constructor(private notification: NotificationsService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap(env => {
        if (env instanceof HttpResponse && env.body.notify) {
          let notyfi = this.notification;
          Object.keys(env.body.message).forEach(function(value, key){
            Object.keys(env.body.message[value]).forEach(function(valueD, keyD){
              notyfi.show(env.body.status, env.body.message[value][valueD]);
            });
        });        
        }
      }),
      catchError(error => {
        setTimeout(() => {
          this.notification.show('error', 'Servidor no encontrado');
        }, 500);
        return throwError(error);
      })
    );
  }
}
