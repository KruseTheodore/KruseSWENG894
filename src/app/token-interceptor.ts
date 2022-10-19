import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, switchMap, throwError } from "rxjs";
import { LoginResponse } from "./auth/login/login.response";
import { AuthService } from "./auth/shared/auth.service";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{

    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public authService: AuthService){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (this.authService.getJwtToken()){
           request = this.addToken(request, this.authService.getJwtToken());
        }
        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 403){
                return this.handleAuthErrors(request, next);
            } else{
                return throwError(error);
            }
        })) ;
    }

    addToken(request: HttpRequest<any>, jwtToken: any) {
        return request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + jwtToken)
        });
    }

    private handleAuthErrors(request: HttpRequest<any>, next: HttpHandler){
        if (!this.isTokenRefreshing){
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponse) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject.next(refreshTokenResponse.access_token);
                    return next.handle(this.addToken(request, refreshTokenResponse.access_token));
                })

            )
        }
        this.isTokenRefreshing = false;
        this.authService.clearStorage();
        return throwError(() => new Error('Login time limit reached. Please refresh the page to login again.'));

    }
}