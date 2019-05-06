import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  token: string | null;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
      const clone = req.clone({setHeaders: { Authorization: `Bearer ${this.token}`}});
      return next.handle(clone);
    }
    return next.handle(req);
  }

  setJwtToken(token: string) {
    this.token = token;
  }

  removeJwtToken() {
    this.token = null;
  }
}
