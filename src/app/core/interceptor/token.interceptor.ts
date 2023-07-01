import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { AuthService } from 'src/app/data/service/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (request.url == environment.webchatUrl) {
            return next.handle(request)
        }
        const authToken = this.auth.getToken();
        if (authToken != null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            });
        }
        return next.handle(request)
    }
}