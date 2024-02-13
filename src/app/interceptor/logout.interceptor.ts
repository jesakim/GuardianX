import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Token } from '@angular/compiler';

@Injectable()
export class LogoutInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ){}

  private refreshCount = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return next.handle(request).pipe(
      
      catchError(error=> {
        
        
        if (error.status === 403) {
          this.authService.logout();
        } else {
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }
}
