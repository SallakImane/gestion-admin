import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from "../auth/auth.service";
import {environment} from '../../../environments/environment';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (request.url !== `${environment.apiUrl}/authenticate` && err.status === 401) {
        // auto logout if 401 response returned from api
        //this.authService.logout();
        location.reload();
      }
      const error = err.error || err;
      return throwError(error);
    }));
  }
}
