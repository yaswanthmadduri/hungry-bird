import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";

import { UserLoginService } from '../user-login/user-login.service';
import { LoadingSpinnerService } from "../loading-spinner/loading-spinner.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userService: UserLoginService, private router: Router, private spinnerService: LoadingSpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.headers.get('noauth'))
            return next.handle(req.clone());

        else {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.userService.getToken())
            });
            this.spinnerService.requestStarted();
            
            return next.handle(clonedreq).pipe(
                tap(
                    event => {
                        if(event instanceof HttpResponse){
                            this.spinnerService.requestEnded();
                        }
                     },
                    err => {
                        this.spinnerService.spinnerReset();
                        if (err.error.auth == false) {
                            this.router.navigateByUrl('/login');
                        }
                    })
            );

        }

    }

    handler(next : any, request : any){
        return next.handle(request).pipe(tap(
            (event)=>{

                if(event instanceof HttpResponse){
                    this.spinnerService.requestEnded();
                }
            },
            (error: HttpErrorResponse) => {
                this.spinnerService.spinnerReset();
                throw error;
            }
        ))
    }

}