import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private router:Router, private authService:AuthServiceService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    // Continue with the modified request
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        // Log successful responses if needed
        if (event instanceof HttpResponse) {
          console.log(event.status,"STATUS");
          console.log('Interceptor - Request successful:', event);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle errors here
        console.log(error.status,"STATUS");
        if(error.status==403){
          this.authService.logout();
          this.router.navigate(["login"])
        }
        console.error('Interceptor - Request error:', error);
        return throwError(error);
      })
    );
  }
}