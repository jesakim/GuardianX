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
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ){}

  private refreshCount = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return next.handle(request).pipe(
      
      catchError(error=> {
        if (!this.refreshCount && error.status === 403) {
          this.refreshCount++;
          var token = this.authService.getToken();
          // this.authService.removeToken();
          debugger;
          this.authService.refreshToken({
            token: token
          }).subscribe(response=>{
            console.log('ref',response);
            this.refreshCount = 0;
            token = response.result.token;
            this.authService.saveToken(response.result.token);
          }
          );
          debugger;
          // console.log('ref',error);
        } else {
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }
}
